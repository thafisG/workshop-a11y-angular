import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  alt?: string;
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
  protected readonly products: Product[] = [
    {
      id: 1,
      name: 'Caneca Ondas do Recife',
      description: 'Cerâmica de 300 ml, vai ao micro-ondas.',
      price: 39.9,
      image: 'img/caneca.svg',
    },
    {
      id: 2,
      name: 'Fone sem fio Maré',
      description: 'Bluetooth com até 30 horas de bateria.',
      price: 189,
      image: 'img/fone.svg',
      alt: 'IMG_0231.png',
    },
    {
      id: 3,
      name: 'Mochila Urbana Capibaribe',
      description: 'Resistente à água, com compartimento para notebook.',
      price: 249.9,
      image: 'img/mochila-baixa.png',
      alt: 'imagem',
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
  protected readonly modalOpen = signal(false);
  protected readonly toast = signal<string | null>(null);

  protected readonly nome = signal('');
  protected readonly email = signal('');
  protected readonly cep = signal('');
  protected readonly errors = signal<Partial<Record<Field, string>>>({});
  protected readonly formMessage = signal('');
  protected readonly orderNumber = signal<number | null>(null);

  protected readonly cartCount = computed(() =>
    this.cart().reduce((total, item) => total + item.quantity, 0),
  );
  protected readonly cartTotal = computed(() =>
    this.cart().reduce((total, item) => total + item.quantity * item.product.price, 0),
  );

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
    this.formMessage.set('');
    this.modalOpen.set(true);
  }

  protected closeModal(): void {
    this.modalOpen.set(false);
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

    const count = Object.keys(errors).length;
    if (count > 0) {
      this.formMessage.set(
        count === 1 ? 'Corrija 1 campo para continuar.' : `Corrija ${count} campos para continuar.`,
      );
      return;
    }

    this.formMessage.set('');
    this.orderNumber.set(1000 + Math.floor(Math.random() * 9000));
    this.cart.set([]);
    this.nome.set('');
    this.email.set('');
    this.cep.set('');
  }

  private showToast(message: string): void {
    clearTimeout(this.toastTimer);
    this.toast.set(message);
    this.toastTimer = setTimeout(() => this.toast.set(null), 4000);
  }
}
