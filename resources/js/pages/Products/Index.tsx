import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";




type Product = {
  id: number;
  name: string;
  description?: string;
  price: string;
};

type PageProps = {
  products: Product[];
};

export default function Index() {
  const { props } = usePage<{ props: PageProps }>(); // explicación abajo
  const products = (props as any).products as Product[];

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Productos</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        Inertia.post('/products', formData);
      }}>
        <input name="name" placeholder="Nombre" />
        <input name="price" placeholder="Precio" />
        <input name="description" placeholder="Descripción" />
        <Button type="submit">Crear</Button>
      </form>

      <h1 className="text-2xl my-4">Lista de Productos</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} — {p.price}€ {p.description && ` — ${p.description}`}</li>
        ))}
      </ul>
    </div>
  );
}
