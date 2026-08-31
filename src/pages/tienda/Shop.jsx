import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/PageShell/PageShell";
import { ParchmentPanel } from "@/components/ParchmentPanel/ParchmentPanel";
import { InkButton } from "@/components/InkButton/InkButton";
import { InkField } from "@/components/InkField/InkField";
import { InkNotice } from "@/components/InkNotice/InkNotice";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { ParchmentCard } from "@/components/ParchmentCard/ParchmentCard";
import { ParchmentDialog } from "@/components/ParchmentDialog/ParchmentDialog";
import { SealDivider } from "@/components/SealDivider/SealDivider";
import { IMG } from "@/assets/assets";
import {
  createProduct,
  deleteProduct,
  firstImage,
  isPresentable,
  listProducts,
  updateProduct,
} from "@/lib/platzi";

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

  const visible = items.filter(
    (p) =>
      (category === "Todo" || p.category?.name === category) &&
      p.title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setCreating(true);
  };

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
    <PageShell>
      <ParchmentPanel>
        <div className="px-5 py-10 sm:px-8 lg:px-16 lg:py-14">
          <PageTitle>Tienda</PageTitle>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <label className="sr-only" htmlFor="buscar">
              Buscar mercancía
            </label>
            <input
              id="buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar mercancía…"
              className="w-[240px] border border-[oklch(0.34_0.04_55_/_0.6)] bg-[oklch(0.92_0.04_84_/_0.7)] px-3 py-2 font-body text-[17px] text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[oklch(0.3_0.03_55)]"
            />
            <InkButton onClick={openCreate}>Inscribir mercancía</InkButton>
            <InkButton variant="outline" onClick={() => void refetch()}>
              Recargar
            </InkButton>
          </div>

          <nav
            aria-label="Categorías"
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`shrink-0 whitespace-nowrap border px-5 py-1.5 font-display text-[14px] tracking-[0.14em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.3_0.03_55)] ${
                  category === c
                    ? "border-[oklch(0.3_0.03_55)] bg-accent text-parchment"
                    : "border-[oklch(0.34_0.04_55_/_0.6)] text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </nav>

          {notice && (
            <div className="mt-8">
              <InkNotice title="Aviso del escribano">{notice}</InkNotice>
            </div>
          )}

          {isPending && (
            <div className="mt-12">
              <InkNotice title="Abriendo el catálogo">
                El escribano copia las mercancías del mercado…
              </InkNotice>
            </div>
          )}

          {isError && items.length === 0 && (
            <div className="mt-12">
              <InkNotice tone="error" title="El mercado no responde">
                {error?.message ?? "No se pudo consultar el catálogo remoto."}
              </InkNotice>
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {visible.map((p, i) => (
                <ParchmentCard key={p.id} className="flex flex-col">
                  <div className="border border-[oklch(0.36_0.04_55_/_0.5)] bg-[oklch(0.9_0.04_84_/_0.6)]">
                    <img
                      src={firstImage(p.images, IMG.products[i % IMG.products.length])}
                      alt={p.title}
                      loading="lazy"
                      width={640}
                      height={640}
                      className="aspect-square w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = IMG.products[i % IMG.products.length];
                      }}
                      style={{
                        mixBlendMode: "multiply",
                        filter: "sepia(0.55) contrast(1.05) saturate(0.85)",
                      }}
                    />
                  </div>
                  <h2 className="mt-4 font-display text-[19px] leading-snug font-bold text-ink">
                    {p.title}
                  </h2>
                  <p className="mt-1 font-body text-[17px] text-ink-soft italic">
                    {p.category?.name ?? "Mercancía"}
                  </p>
                  <div className="mt-3 ink-rule" />
                  <p className="mt-3 font-display text-[20px] text-ink">
                    {Math.round(p.price)}{" "}
                    <span className="text-[15px] tracking-wider">monedas de oro</span>
                  </p>
                  {/* <div className="mt-4 flex flex-wrap gap-2">
                    <InkButton>Añadir al carro</InkButton>
                    <InkButton variant="outline" onClick={() => openEdit(p)}>
                      Enmendar
                    </InkButton>
                    <InkButton variant="danger" onClick={() => void remove(p)}>
                      Retirar
                    </InkButton>
                  </div> */}
                </ParchmentCard>
              ))}
              {visible.length === 0 && (
                <div className="sm:col-span-2 xl:col-span-4">
                  <InkNotice title="Sin mercancías">
                    Ninguna mercancía coincide con la búsqueda.
                  </InkNotice>
                </div>
              )}
            </div>
          )}

          <div className="mt-16 pb-4">
            <SealDivider />
          </div>
        </div>

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
      </ParchmentPanel>
    </PageShell>
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
