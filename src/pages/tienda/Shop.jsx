import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/PageShell/PageShell";
import { InkButton } from "@/components/InkButton/InkButton";
import { InkField } from "@/components/InkField/InkField";
import { InkNotice } from "@/components/InkNotice/InkNotice";
import { ParchmentDialog } from "@/components/ParchmentDialog/ParchmentDialog";
import { IMG } from "@/assets/assets";
import {
  createProduct,
  deleteProduct,
  firstImage,
  isPresentable,
  listProducts,
  updateProduct,
} from "@/lib/platzi";
import "./Shop.css";

const EMPTY_FORM = { title: "", price: "", description: "", image: "" };

function Shop() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["products", "catalog"],
    queryFn: () => listProducts(40),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("Todo");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (data) setItems(data.filter(isPresentable));
  }, [data]);

  const categories = useMemo(
    () => ["Todo", ...Array.from(new Set(items.map((p) => p.category?.name).filter(Boolean)))],
    [items],
  );

  const visibleProducts = items.filter(
    (p) =>
      (category === "Todo" || p.category?.name === category) &&
      p.title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setCreating(true);
  };

  // Usado por el botón "Enmendar", temporalmente comentado más abajo.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openEdit = (p) => {
    setForm({
      title: p.title,
      price: String(Math.round(p.price)),
      description: p.description ?? "",
      image: firstImage(p.images, IMG.products[0]),
    });
    setEditing(p);
  };

  const submitCreate = async () => {
    setBusy(true);
    setNotice(null);
    const payload = {
      title: form.title,
      price: Number(form.price) || 1,
      description: form.description || "Mercancía del gremio.",
      categoryId: 1,
      images: [form.image || IMG.products[0]],
    };
    try {
      const created = await createProduct(payload);
      setItems((prev) => [created, ...prev]);
      setNotice("Mercancía inscrita en el catálogo.");
    } catch {
      setItems((prev) => [
        {
          id: Date.now(),
          title: payload.title,
          price: payload.price,
          description: payload.description,
          images: payload.images,
          category: { id: 1, name: "Mercancía", image: "" },
        },
        ...prev,
      ]);
      setNotice(
        "La API de demostración rechazó el alta remota; la mercancía se muestra sólo en esta sesión.",
      );
    } finally {
      setBusy(false);
      setCreating(false);
    }
  };

  const submitEdit = async () => {
    if (!editing) return;
    setBusy(true);
    setNotice(null);
    const patch = {
      title: form.title,
      price: Number(form.price) || editing.price,
      description: form.description,
      images: [form.image || firstImage(editing.images, IMG.products[0])],
    };
    try {
      await updateProduct(editing.id, patch);
      setNotice("Mercancía enmendada.");
    } catch {
      setNotice("La API de demostración no guardó el cambio; se refleja sólo en esta sesión.");
    }
    setItems((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...patch } : p)));
    setBusy(false);
    setEditing(null);
  };

  // Usado por el botón "Retirar", temporalmente comentado más abajo.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const remove = async (p) => {
    setNotice(null);
    try {
      await deleteProduct(p.id);
      setNotice("Mercancía retirada del catálogo.");
    } catch {
      setNotice("La API de demostración no borró el registro; se retira sólo en esta sesión.");
    }
    setItems((prev) => prev.filter((x) => x.id !== p.id));
  };

  return (
    <PageShell heraldryOverlay>
      <section className="shop-hall flex min-h-[calc(100vh-74px)] flex-col">
        {/* La heráldica es un overlay decorativo: sólo dejamos el hueco visual
            mínimo a su izquierda, sin reservar una tercera columna. */}
        <div className="flex-1 px-4 pt-6 pb-10 sm:px-6 lg:pr-10 lg:pl-[124px]">

          <h1 className="sr-only">Tienda del reino</h1>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[236px_minmax(0,1fr)]">
            <CatalogueSidebar
              categories={categories}
              category={category}
              onCategory={setCategory}
              search={search}
              onSearch={setSearch}
              onCreate={openCreate}
              onReload={() => void refetch()}
            />

            <div className="min-w-0">
              <CatalogueHeading />

              {notice && (
                <div className="mt-6" role="status">
                  <InkNotice title="Aviso del escribano">{notice}</InkNotice>
                </div>
              )}

              {isPending && (
                <div className="mt-8">
                  <InkNotice title="Abriendo el catálogo">
                    El escribano copia las mercancías del mercado…
                  </InkNotice>
                </div>
              )}

              {isError && items.length === 0 && (
                <div className="mt-8">
                  <InkNotice tone="error" title="El mercado no responde">
                    {error?.message ?? "No se pudo consultar el catálogo remoto."}
                  </InkNotice>
                </div>
              )}

              {items.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                  {visibleProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} fallbackIndex={i} />
                  ))}
                  {visibleProducts.length === 0 && (
                    <div className="col-span-2 lg:col-span-3 xl:col-span-4">
                      <InkNotice title="Sin mercancías">
                        Ninguna mercancía coincide con la búsqueda.
                      </InkNotice>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mostrador de madera bajo el catálogo, como en el diseño del reino. */}
        <div className="shop-counter h-[128px] w-full sm:h-[162px]" aria-hidden="true" />
      </section>

      <ProductDialog
        open={creating}
        title="Inscribir mercancía"
        form={form}
        setForm={setForm}
        busy={busy}
        onClose={() => setCreating(false)}
        onSubmit={submitCreate}
      />
      <ProductDialog
        open={editing !== null}
        title="Enmendar mercancía"
        form={form}
        setForm={setForm}
        busy={busy}
        onClose={() => setEditing(null)}
        onSubmit={submitEdit}
      />
    </PageShell>
  );
}

/** Ornamental rule with medieval finials above the product grid. */
function CatalogueHeading() {
  return (
    <div className="shop-heading relative flex items-center gap-4">
      <HeadingRule flip />
      <h2 className="shrink-0 font-display text-[19px] tracking-[0.14em] whitespace-nowrap text-parchment uppercase sm:text-[22px]">
        Todos los productos
      </h2>
      <HeadingRule />
    </div>
  );
}

function HeadingRule({ flip = false }) {
  return (
    <span className="flex min-w-0 flex-1 items-center gap-2" aria-hidden="true">
      {flip && <HeadingFinial flip />}
      <span className="shop-heading-line h-px flex-1" />
      {!flip && <HeadingFinial />}
    </span>
  );
}

/** Small diamond finial with a tapering bar, in place of arrow glyphs. */
function HeadingFinial({ flip = false }) {
  return (
    <svg
      width="42"
      height="12"
      viewBox="0 0 42 12"
      fill="none"
      className="shop-heading-finial"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M0 6h20" stroke="currentColor" strokeWidth="1" />
      <path d="M26 1.5 30.5 6 26 10.5 21.5 6z" fill="currentColor" opacity="0.85" />
      <path d="M35 3.5 37.5 6 35 8.5 32.5 6z" fill="currentColor" opacity="0.6" />
      <path d="M39.5 4.5 41.5 6l-2 1.5z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/** Left rail with the category list and the catalogue controls. */
function CatalogueSidebar({
  categories,
  category,
  onCategory,
  search,
  onSearch,
  onCreate,
  onReload,
}) {
  return (
    <aside className="shop-panel relative h-fit px-5 py-6">
      <span className="shop-panel-corner shop-panel-corner--tl" aria-hidden="true" />
      <span className="shop-panel-corner shop-panel-corner--tr" aria-hidden="true" />
      <span className="shop-panel-corner shop-panel-corner--bl" aria-hidden="true" />
      <span className="shop-panel-corner shop-panel-corner--br" aria-hidden="true" />

      <nav aria-label="Categorías">
        <h2 className="shop-panel-title">Categorías</h2>
        <div className="mt-3 flex flex-col">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className="shop-category"
              aria-pressed={category === c}
              onClick={() => onCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </nav>

      <div className="mt-7">
        <h2 className="shop-panel-title">Buscar</h2>
        <label className="sr-only" htmlFor="buscar">
          Buscar mercancía
        </label>
        <input
          id="buscar"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar mercancía…"
          className="ledger-control mt-3 w-full"
        />
        <div className="mt-4 flex flex-col gap-3">
          <InkButton onClick={onCreate}>Inscribir mercancía</InkButton>
          <InkButton variant="outline" onClick={onReload}>
            Recargar
          </InkButton>
        </div>
      </div>
    </aside>
  );
}

/** Single catalogue entry framed like medieval metalwork over parchment. */
function ProductCard({ product, fallbackIndex }) {
  const fallback = IMG.products[fallbackIndex % IMG.products.length];
  return (
    <article className="shop-card" style={{ "--shop-parchment": `url(${IMG.parchment})` }}>
      <div className="shop-card-inner flex flex-col">
        <div className="shop-card-media">
          <img
            src={firstImage(product.images, fallback)}
            alt={product.title}
            loading="lazy"
            width={640}
            height={640}
            className="aspect-[4/3] w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = fallback;
            }}
          />
        </div>
        <div className="shop-card-body flex min-h-[76px] flex-1 flex-col justify-between px-3 py-2.5">
          <h3 className="shop-card-title line-clamp-2 font-display text-[15px] leading-snug font-semibold text-ink">
            {product.title}
          </h3>
          <p className="shop-card-price mt-1.5 font-body text-[16px]">
            {Math.round(product.price)}{" "}
            <span className="text-[13px] tracking-wider">monedas de oro</span>
          </p>
        </div>
      </div>
      {/* Acciones CRUD temporalmente ocultas (sin carrito en el proyecto).
      <div className="flex flex-wrap gap-2 px-3 pb-3">
        <InkButton variant="outline" onClick={() => openEdit(product)}>Enmendar</InkButton>
        <InkButton variant="danger" onClick={() => void remove(product)}>Retirar</InkButton>
      </div> */}
    </article>
  );
}

function ProductDialog({ open, title, form, setForm, busy, onClose, onSubmit }) {
  return (
    <ParchmentDialog open={open} title={title} onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <InkField
          label="Nombre"
          value={form.title}
          required
          onChange={(v) => setForm({ ...form, title: v })}
        />
        <InkField
          label="Precio en monedas de oro"
          type="number"
          value={form.price}
          required
          onChange={(v) => setForm({ ...form, price: v })}
        />
        <InkField
          label="Descripción"
          textarea
          value={form.description}
          onChange={(v) => setForm({ ...form, description: v })}
        />
        <InkField
          label="Grabado (URL)"
          value={form.image}
          onChange={(v) => setForm({ ...form, image: v })}
        />
        <div className="flex flex-wrap gap-3 pt-2">
          <InkButton type="submit" disabled={busy}>
            {busy ? "Sellando…" : "Sellar"}
          </InkButton>
          <InkButton variant="outline" onClick={onClose}>
            Cancelar
          </InkButton>
        </div>
      </form>
    </ParchmentDialog>
  );
}

export default Shop;
