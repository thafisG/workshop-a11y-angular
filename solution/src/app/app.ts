import { CurrencyPipe } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

type Field = 'nome' | 'email' | 'cep';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly products: Product[] = [
    {
      id: 1,
      name: 'Caneca Ondas do Recife',
      description: 'Cerâmica de 300 ml, vai ao micro-ondas.',
      price: 39.9,
      image: 'img/caneca.svg',
      alt: 'Caneca branca de cerâmica com listras onduladas em azul',
    },
    {
      id: 2,
      name: 'Fone sem fio Maré',
      description: 'Bluetooth com até 30 horas de bateria.',
      price: 189,
      image: 'img/fone.svg',
      alt: 'Fone de ouvido sem fio preto, com arco ajustável e almofadas grandes',
    },
    {
      id: 3,
      name: 'Mochila Urbana Capibaribe',
      description: 'Resistente à água, com compartimento para notebook.',
      price: 249.9,
      image: 'img/mochila.svg',
      alt: 'Mochila verde com bolso frontal e fecho amarelo',
    },
    {
      id: 4,
      name: 'Garrafa térmica Frevo',
      description: 'Aço inox, mantém a bebida gelada por 24 horas.',
      price: 79.9,
      image: 'img/garrafa.svg',
      alt: 'Garrafa térmica roxa de aço inox com tampa escura',
    },
  ];

  protected readonly cart = signal<CartItem[]>([]);
  protected readonly favorites = signal<ReadonlySet<number>>(new Set());
  protected readonly toast = signal<string | null>(null);

  protected readonly nome = signal('');
  protected readonly email = signal('');
  protected readonly cep = signal('');
  protected readonly errors = signal<Partial<Record<Field, string>>>({});
  protected readonly formMessage = signal('');
  protected readonly formMessageIsError = signal(false);
  protected readonly orderNumber = signal<number | null>(null);

  protected readonly cartCount = computed(() =>
    this.cart().reduce((total, item) => total + item.quantity, 0),
  );
  protected readonly cartTotal = computed(() =>
    this.cart().reduce((total, item) => total + item.quantity * item.product.price, 0),
  );
  protected readonly cartLabel = computed(() => {
    const count = this.cartCount();
    return `Abrir carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`;
  });

  private toastTimer?: ReturnType<typeof setTimeout>;

  protected addToCart(product: Product): void {
    this.cart.update((items) => {
      const existing = items.find((item) => item.product.id === product.id);
      if (existing) {
        return items.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { product, quantity: 1 }];
    });
    this.showToast(`${product.name} adicionado ao carrinho`);
  }

  protected removeFromCart(product: Product): void {
    this.cart.update((items) => items.filter((item) => item.product.id !== product.id));
    this.setFormMessage(`${product.name} removido do carrinho.`, false);
    // O botão clicado deixa de existir: devolvemos o foco para um ponto previsível do diálogo.
    this.focusAfterRender('#modal-title');
  }

  protected toggleFavorite(id: number): void {
    this.favorites.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  protected isFavorite(id: number): boolean {
    return this.favorites().has(id);
  }

  protected openModal(): void {
    this.orderNumber.set(null);
    this.setFormMessage('', false);
    // showModal() move o foco para dentro, prende o Tab, torna o fundo inerte,
    // fecha com Esc e devolve o foco ao botão que abriu.
    this.dialog().nativeElement.showModal();
  }

  protected closeModal(): void {
    this.dialog().nativeElement.close();
  }

  protected onDialogClosed(): void {
    this.orderNumber.set(null);
    this.setFormMessage('', false);
  }

  protected onDialogClick(event: MouseEvent): void {
    // Clique no fundo escurecido (::backdrop) fecha o diálogo. Esc continua funcionando.
    if (event.target === this.dialog().nativeElement) {
      this.closeModal();
    }
  }

  protected setField(field: Field, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this[field].set(value);
  }

  protected submit(event: Event): void {
    event.preventDefault();

    const errors: Partial<Record<Field, string>> = {};
    if (this.nome().trim().length < 3) {
      errors.nome = 'Informe seu nome completo.';
    }
    if (!/^\S+@\S+\.\S+$/.test(this.email().trim())) {
      errors.email = 'Informe um e-mail válido, como nome@exemplo.com.';
    }
    if (!/^\d{5}-?\d{3}$/.test(this.cep().trim())) {
      errors.cep = 'Informe um CEP com 8 dígitos.';
    }
    this.errors.set(errors);

    const invalidFields = (Object.keys(errors) as Field[]);
    if (invalidFields.length > 0) {
      const count = invalidFields.length;
      this.setFormMessage(
        count === 1 ? 'Corrija 1 campo para continuar.' : `Corrija ${count} campos para continuar.`,
        true,
      );
      // Leva o foco ao primeiro campo com erro; o leitor lê rótulo + mensagem (aria-describedby).
      this.focusAfterRender(`#campo-${invalidFields[0]}`);
      return;
    }

    this.setFormMessage('', false);
    this.orderNumber.set(1000 + Math.floor(Math.random() * 9000));
    this.cart.set([]);
    this.nome.set('');
    this.email.set('');
    this.cep.set('');
    // O botão "Finalizar compra" some da tela: o foco vai para a confirmação.
    this.focusAfterRender('#confirmacao-titulo');
  }

  private setFormMessage(message: string, isError: boolean): void {
    this.formMessage.set(message);
    this.formMessageIsError.set(isError);
  }

  private focusAfterRender(selector: string): void {
    afterNextRender(
      () => this.host.nativeElement.querySelector<HTMLElement>(selector)?.focus(),
      { injector: this.injector },
    );
  }

  private showToast(message: string): void {
    clearTimeout(this.toastTimer);
    this.toast.set(message);
    this.toastTimer = setTimeout(() => this.toast.set(null), 4000);
  }
}
