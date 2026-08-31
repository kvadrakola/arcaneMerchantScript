import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/PageShell/PageShell";
import { ParchmentPanel } from "@/components/ParchmentPanel/ParchmentPanel";
import { InkButton } from "@/components/InkButton/InkButton";
import { InkField } from "@/components/InkField/InkField";
import { InkNotice } from "@/components/InkNotice/InkNotice";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { ParchmentDialog } from "@/components/ParchmentDialog/ParchmentDialog";
import { SealDivider } from "@/components/SealDivider/SealDivider";
import { Vellum } from "@/components/Vellum/Vellum";
import { IMG } from "@/assets/assets";
import { createUser, deleteUser, listUsers, updateUser } from "@/lib/platzi";
import "./Users.css";

const EMPTY = {
  name: "",
  email: "",
  password: "",
  role: "customer",
  avatar: "https://i.pravatar.cc/150?img=12",
};

const ROLE_LABELS = { admin: "Mayordomo del reino", customer: "Súbdito" };

function Users() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => listUsers(20),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const [items, setItems] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const openEdit = (u) => {
    setForm({
      name: u.name,
      email: u.email,
      password: "",
      role: u.role === "admin" ? "admin" : "customer",
      avatar: u.avatar,
    });
    setEditing(u);
  };

  const submitCreate = async () => {
    setBusy(true);
    setNotice(null);
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password || "changeme",
      role: form.role,
      avatar: form.avatar || EMPTY.avatar,
    };
    try {
      const created = await createUser(payload);
      setItems((prev) => [created, ...prev]);
      setNotice("Súbdito inscrito en el libro del reino.");
    } catch {
      setItems((prev) => [{ id: Date.now(), ...payload }, ...prev]);
      setNotice(
        "La API de demostración rechazó el alta remota; la inscripción se muestra sólo en esta sesión.",
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
      name: form.name,
      email: form.email,
      role: form.role,
      avatar: form.avatar,
    };
    try {
      await updateUser(editing.id, patch);
      setNotice("Registro enmendado.");
    } catch {
      setNotice("La API de demostración no guardó el cambio; se refleja sólo en esta sesión.");
    }
    setItems((prev) => prev.map((u) => (u.id === editing.id ? { ...u, ...patch } : u)));
    setBusy(false);
    setEditing(null);
  };

  const remove = async (u) => {
    setNotice(null);
    try {
      await deleteUser(u.id);
      setNotice("Súbdito borrado del libro.");
    } catch {
      setNotice("La API de demostración no borró el registro; se retira sólo en esta sesión.");
    }
    setItems((prev) => prev.filter((x) => x.id !== u.id));
  };

  return (
    <PageShell>
      <ParchmentPanel>
        <div className="px-5 py-10 sm:px-8 lg:px-16 lg:py-14">
          <PageTitle>Usuarios</PageTitle>

          <Vellum className="mx-auto mt-8 max-w-[720px] text-center font-body text-[19px] leading-[1.7] text-ink-soft sm:text-[20px]">
            <p>
              Libro de registro de los súbditos inscritos en el mercado del reino, copiado del
              archivo de FakeAPI Platzi.
            </p>
          </Vellum>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <InkButton
              onClick={() => {
                setForm(EMPTY);
                setCreating(true);
              }}
            >
              Inscribir súbdito
            </InkButton>
            <InkButton variant="outline" onClick={() => void refetch()}>
              Recargar
            </InkButton>
          </div>

          {notice && (
            <div className="mt-8">
              <InkNotice title="Aviso del escribano">{notice}</InkNotice>
            </div>
          )}

          {isPending && (
            <div className="mt-12">
              <InkNotice title="Abriendo el libro">El escribano copia los registros…</InkNotice>
            </div>
          )}

          {isError && items.length === 0 && (
            <div className="mt-12">
              <InkNotice tone="error" title="El archivo no responde">
                {error?.message ?? "No se pudo consultar el registro remoto."}
              </InkNotice>
            </div>
          )}

          {items.length > 0 && (
            <div className="users-table-frame mt-12 border-2 border-[oklch(0.36_0.04_55_/_0.55)] bg-[oklch(0.86_0.05_80_/_0.6)] p-1.5">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse font-body text-[19px] text-ink">
                  <caption className="sr-only">Registro de súbditos del mercado</caption>
                  <thead>
                    <tr className="border-b-2 border-[oklch(0.34_0.04_55_/_0.6)]">
                      {["Retrato", "Nombre", "Correo", "Rango", "Sello"].map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="px-5 py-3.5 text-left font-display text-[14px] tracking-[0.16em] uppercase text-ink"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((u, i) => (
                      <tr
                        key={u.id}
                        className={`border-b border-[oklch(0.34_0.04_55_/_0.3)] ${
                          i % 2 === 1 ? "bg-[oklch(0.83_0.05_78_/_0.45)]" : ""
                        }`}
                      >
                        <td className="px-5 py-3">
                          <img
                            src={u.avatar}
                            alt={`Retrato de ${u.name}`}
                            loading="lazy"
                            width={48}
                            height={48}
                            onError={(e) => {
                              e.currentTarget.src = IMG.seal;
                            }}
                            className="users-avatar h-[48px] w-[48px] border border-[oklch(0.34_0.04_55_/_0.6)] object-cover"
                          />
                        </td>
                        <td className="px-5 py-3.5">{u.name}</td>
                        <td className="px-5 py-3.5 text-ink-soft">{u.email}</td>
                        <td className="px-5 py-3.5 italic text-ink-soft">
                          {ROLE_LABELS[u.role] ?? u.role}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex flex-wrap gap-2">
                            <InkButton
                              variant="outline"
                              onClick={() => openEdit(u)}
                              aria-label={`Enmendar el registro de ${u.name}`}
                            >
                              Enmendar
                            </InkButton>
                            <InkButton
                              variant="danger"
                              onClick={() => void remove(u)}
                              aria-label={`Borrar el registro de ${u.name}`}
                            >
                              Borrar
                            </InkButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-16 pb-4">
            <SealDivider />
          </div>
        </div>

        <UserDialog
          open={creating}
          title="Inscribir súbdito"
          form={form}
          setForm={setForm}
          busy={busy}
          showPassword
          onClose={() => setCreating(false)}
          onSubmit={submitCreate}
        />
        <UserDialog
          open={editing !== null}
          title="Enmendar súbdito"
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

function UserDialog({ open, title, form, setForm, busy, showPassword, onClose, onSubmit }) {
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
          value={form.name}
          required
          onChange={(v) => setForm({ ...form, name: v })}
        />
        <InkField
          label="Correo"
          type="email"
          value={form.email}
          required
          onChange={(v) => setForm({ ...form, email: v })}
        />
        {showPassword && (
          <InkField
            label="Contraseña"
            type="password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
          />
        )}
        <p>
          <label
            htmlFor="rango"
            className="font-display text-[13px] tracking-[0.14em] uppercase text-ink-soft"
          >
            Rango
          </label>
          <select
            id="rango"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value === "admin" ? "admin" : "customer" })
            }
            className="ledger-control mt-1.5 w-full"
          >
            <option value="customer">Súbdito</option>
            <option value="admin">Mayordomo del reino</option>
          </select>
        </p>
        <InkField
          label="Retrato (URL)"
          value={form.avatar}
          onChange={(v) => setForm({ ...form, avatar: v })}
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

export default Users;
