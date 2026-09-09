import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div class="crew-products-heading">
      <h2>Products</h2>
      <span class="crew-product-description">Crew Fireworks delivers fireworks fast to your door. Choose from a wide variety of products that hands down deliver bright colors, impressive effects and stunning prices. Add your choice of products to one of our Shows and automatically get free shipping. See policies.</span>
    </div>
  )
}
