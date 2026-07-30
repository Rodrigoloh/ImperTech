"use client";

import { FormEvent, useMemo, useState } from "react";

const PHONE_CALL = "524421186062";
const PHONE_QUOTE = "524461255861";

const services = [
  {
    id: "acrilico",
    short: "Acrílico",
    name: "Sistema acrílico",
    price: 90,
    unit: "m²",
    description:
      "Aplicación uniforme para losas residenciales y comerciales.",
  },
  {
    id: "prefabricado",
    short: "Prefabricado",
    name: "Prefabricado + acrílico",
    price: 160,
    unit: "m²",
    description:
      "Sistema reforzado para superficies con mayores exigencias.",
  },
  {
    id: "cementoso",
    short: "Cementoso",
    name: "Impermeabilizante cementoso",
    price: 80,
    unit: "m²",
    description:
      "Protección mineral para muros, cisternas y superficies de concreto.",
  },
  {
    id: "vapor",
    short: "Barrera de vapor",
    name: "Barrera de vapor",
    price: 60,
    unit: "m²",
    description:
      "Control de humedad y condensación en sistemas constructivos.",
  },
];

const steps = [
  ["01", "Diagnóstico", "Revisamos superficie, humedad, pendientes y puntos críticos."],
  ["02", "Preparación", "Limpiamos, resanamos y sellamos antes de aplicar el sistema."],
  ["03", "Aplicación", "Ejecutamos capas uniformes con equipo profesional."],
  ["04", "Entrega", "Verificamos detalles y dejamos recomendaciones de mantenimiento."],
];

function money(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [serviceId, setServiceId] = useState("acrilico");
  const [area, setArea] = useState(50);
  const [chatOpen, setChatOpen] = useState(false);

  const selected = useMemo(
    () => services.find((service) => service.id === serviceId) ?? services[0],
    [serviceId],
  );
  const estimate = Math.max(0, area || 0) * selected.price;

  function sendQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const zone = String(form.get("zone") || "").trim();
    const property = String(form.get("property") || "").trim();
    const notes = String(form.get("notes") || "").trim();

    const message = [
      "Hola Impertech, quiero solicitar una cotización.",
      "",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Zona: ${zone}`,
      `Inmueble: ${property}`,
      `Sistema: ${selected.name}`,
      `Superficie aproximada: ${area} m²`,
      `Estimado de referencia: ${money(estimate)} MXN`,
      notes ? `Detalles: ${notes}` : "",
      "",
      "Entiendo que el precio final depende de una revisión de la superficie.",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${PHONE_QUOTE}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Impertech, ir al inicio">
          <img src="/impertech-logo.png" alt="Impertech" />
        </a>
        <nav aria-label="Navegación principal">
          <a href="#servicios">Sistemas</a>
          <a href="#proceso">Proceso</a>
          <a href="#estructuras">Estructuras</a>
          <a href="#cotizador">Cotizador</a>
        </nav>
        <a className="header-phone" href={`tel:+${PHONE_CALL}`}>
          <span>Llámanos</span>
          442 118 6062
        </a>
      </header>

      <section className="hero" id="inicio">
        <img
          className="hero-image"
          src="/hero-airless.png"
          alt="Técnico de Impertech aplicando impermeabilizante con equipo airless"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Impermeabilización · Querétaro y alrededores</p>
          <h1>
            Tu propiedad,
            <span> protegida de raíz.</span>
          </h1>
          <p className="hero-lead">
            Sistemas profesionales para prevenir filtraciones, humedad y
            deterioro. Diagnóstico, preparación y aplicación con precisión.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#cotizador">
              Cotiza por m² <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button-ghost"
              href={`https://wa.me/${PHONE_QUOTE}?text=${encodeURIComponent("Hola Impertech, quiero información sobre impermeabilización.")}`}
              target="_blank"
              rel="noreferrer"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Ventajas del servicio">
          <div>
            <strong>4</strong>
            <span>Sistemas especializados</span>
          </div>
          <div>
            <strong>Airless</strong>
            <span>Aplicación uniforme</span>
          </div>
          <div>
            <strong>Fester · Sika</strong>
            <span>Materiales de confianza</span>
          </div>
        </div>
      </section>

      <section className="brand-strip" aria-label="Marcas con las que trabajamos">
        <span>Trabajamos con sistemas y materiales de</span>
        <strong>FESTER</strong>
        <i />
        <strong>SIKA</strong>
        <small>
          La selección depende del diagnóstico y requerimientos de cada obra.
        </small>
      </section>

      <section className="section systems" id="servicios">
        <div className="section-heading">
          <div>
            <p className="eyebrow blue">Sistemas de impermeabilización</p>
            <h2>La solución correcta para cada superficie.</h2>
          </div>
          <p>
            No todos los problemas de humedad se resuelven igual. Elegimos el
            sistema según el sustrato, el uso del espacio y el nivel de
            exposición.
          </p>
        </div>
        <div className="system-grid">
          {services.map((service, index) => (
            <article className="system-card" key={service.id}>
              <span className="card-index">0{index + 1}</span>
              <div className={`system-icon icon-${index + 1}`} aria-hidden="true">
                <i />
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="price">
                <strong>{money(service.price)}</strong>
                <span>/ {service.unit}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setServiceId(service.id);
                  document
                    .getElementById("cotizador")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Calcular este sistema <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
        <p className="price-note">
          * Precios de referencia para aplicación. La preparación, reparaciones,
          accesos y condiciones especiales se cotizan después de la revisión.
        </p>
      </section>

      <section className="process-section" id="proceso">
        <div className="process-intro">
          <p className="eyebrow">Trabajo técnico, resultado duradero</p>
          <h2>Impermeabilizar bien empieza antes de abrir la cubeta.</h2>
          <p>
            La preparación es la diferencia entre cubrir un problema y
            resolverlo. Nuestro proceso cuida cada etapa de la intervención.
          </p>
          <a href="#cotizador">Solicitar diagnóstico <span>↗</span></a>
        </div>
        <div className="process-list">
          {steps.map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="equipment">
        <div className="equipment-visual" aria-hidden="true">
          <span className="spray spray-one" />
          <span className="spray spray-two" />
          <span className="spray spray-three" />
          <div className="machine">
            <i />
            <b />
          </div>
        </div>
        <div className="equipment-copy">
          <p className="eyebrow">Tecnología aplicada</p>
          <h2>Más uniforme. Más eficiente. Más profesional.</h2>
          <p>
            Incorporamos equipos de pulverización airless para lograr una
            cobertura controlada y homogénea en superficies amplias, reduciendo
            variaciones y optimizando los tiempos de aplicación.
          </p>
          <ul>
            <li>Cobertura pareja y controlada</li>
            <li>Mayor productividad en obra</li>
            <li>Acabado limpio y profesional</li>
          </ul>
        </div>
      </section>

      <section className="structures" id="estructuras">
        <div className="structure-copy">
          <p className="eyebrow blue">Más soluciones para tu propiedad</p>
          <h2>Estructuras, techos y mantenimiento integral.</h2>
          <p>
            Además de impermeabilizar, fabricamos estructuras metálicas y
            cubiertas a la medida para accesos, terrazas, patios y espacios de
            trabajo. También resolvemos reparaciones y mantenimiento residencial
            e industrial.
          </p>
          <div className="structure-tags">
            <span>Techos y cubiertas</span>
            <span>Estructuras metálicas</span>
            <span>Reparaciones</span>
            <span>Mantenimiento integral</span>
          </div>
          <a
            className="button button-dark"
            href={`https://wa.me/${PHONE_QUOTE}?text=${encodeURIComponent("Hola Impertech, quiero cotizar una estructura, techo o trabajo de mantenimiento.")}`}
            target="_blank"
            rel="noreferrer"
          >
            Cuéntanos tu proyecto <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="structure-visual" aria-label="Representación de una cubierta metálica">
          <div className="roof-lines">
            {Array.from({ length: 9 }).map((_, index) => (
              <i key={index} />
            ))}
          </div>
          <div className="steel-beam beam-a" />
          <div className="steel-beam beam-b" />
          <div className="steel-post post-a" />
          <div className="steel-post post-b" />
          <span>Diseño · Fabricación · Instalación</span>
        </div>
      </section>

      <section className="quote-section" id="cotizador">
        <div className="quote-heading">
          <p className="eyebrow">Cotizador rápido</p>
          <h2>Obtén un estimado en menos de un minuto.</h2>
          <p>
            Elige el sistema, indica la superficie y comparte tus datos. Te
            llevaremos a WhatsApp con toda la información lista.
          </p>
        </div>

        <form className="quote-card" onSubmit={sendQuote}>
          <div className="quote-step">
            <div className="step-label">
              <span>01</span>
              <div>
                <strong>Elige el sistema</strong>
                <small>Precio de aplicación por m²</small>
              </div>
            </div>
            <div className="service-options">
              {services.map((service) => (
                <label
                  className={service.id === serviceId ? "selected" : ""}
                  key={service.id}
                >
                  <input
                    type="radio"
                    name="service"
                    value={service.id}
                    checked={service.id === serviceId}
                    onChange={() => setServiceId(service.id)}
                  />
                  <span>{service.short}</span>
                  <strong>{money(service.price)}</strong>
                </label>
              ))}
            </div>
          </div>

          <div className="quote-step area-step">
            <div className="step-label">
              <span>02</span>
              <div>
                <strong>Superficie aproximada</strong>
                <small>Mide largo × ancho de la zona</small>
              </div>
            </div>
            <div className="area-control">
              <button
                type="button"
                aria-label="Restar diez metros cuadrados"
                onClick={() => setArea((value) => Math.max(1, value - 10))}
              >
                −
              </button>
              <label>
                <input
                  aria-label="Metros cuadrados"
                  type="number"
                  name="area"
                  min="1"
                  max="10000"
                  value={area}
                  onChange={(event) =>
                    setArea(Math.max(1, Number(event.target.value)))
                  }
                  required
                />
                <span>m²</span>
              </label>
              <button
                type="button"
                aria-label="Sumar diez metros cuadrados"
                onClick={() => setArea((value) => value + 10)}
              >
                +
              </button>
            </div>
          </div>

          <div className="estimate-panel" aria-live="polite">
            <div>
              <span>Estimado de referencia</span>
              <strong>{money(estimate)}</strong>
              <small>
                {area} m² × {money(selected.price)} / m²
              </small>
            </div>
            <p>
              No incluye preparación, reparaciones, materiales adicionales ni
              condiciones especiales de acceso.
            </p>
          </div>

          <div className="quote-step">
            <div className="step-label">
              <span>03</span>
              <div>
                <strong>¿A quién enviamos el estimado?</strong>
                <small>Datos para dar seguimiento a tu consulta</small>
              </div>
            </div>
            <div className="lead-grid">
              <label>
                Nombre
                <input name="name" placeholder="Tu nombre" autoComplete="name" required />
              </label>
              <label>
                Teléfono
                <input
                  name="phone"
                  type="tel"
                  placeholder="10 dígitos"
                  autoComplete="tel"
                  pattern="[0-9 +()-]{10,}"
                  required
                />
              </label>
              <label>
                Zona / colonia
                <input
                  name="zone"
                  placeholder="Ej. El Refugio, Qro."
                  autoComplete="address-level2"
                  required
                />
              </label>
              <label>
                Tipo de inmueble
                <select name="property" defaultValue="" required>
                  <option value="" disabled>Selecciona una opción</option>
                  <option>Casa</option>
                  <option>Comercio</option>
                  <option>Nave industrial</option>
                  <option>Edificio / condominio</option>
                  <option>Otro</option>
                </select>
              </label>
              <label className="full-field">
                Detalles opcionales
                <textarea
                  name="notes"
                  placeholder="Cuéntanos si hay filtraciones, grietas o trabajos previos."
                  rows={3}
                />
              </label>
            </div>
            <label className="consent">
              <input type="checkbox" required />
              <span>
                Acepto que Impertech me contacte para dar seguimiento a esta
                solicitud.
              </span>
            </label>
          </div>

          <button className="submit-quote" type="submit">
            Enviar estimado por WhatsApp <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>

      <section className="contact-band">
        <div>
          <p className="eyebrow">¿Tienes dudas?</p>
          <h2>Hablemos de tu propiedad.</h2>
        </div>
        <div className="contact-actions">
          <a href={`tel:+${PHONE_CALL}`}>
            <small>Llamadas, dudas y aclaraciones</small>
            <strong>442 118 6062</strong>
          </a>
          <a
            href={`https://wa.me/${PHONE_QUOTE}?text=${encodeURIComponent("Hola Impertech, quiero una cotización.")}`}
            target="_blank"
            rel="noreferrer"
          >
            <small>Cotizaciones por WhatsApp</small>
            <strong>446 125 5861</strong>
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <img src="/impertech-logo.png" alt="Impertech" />
          <p>
            Soluciones en impermeabilización y mantenimiento integral para
            hogares, comercios e industria.
          </p>
        </div>
        <div>
          <strong>Servicios</strong>
          <a href="#servicios">Impermeabilización</a>
          <a href="#estructuras">Estructuras y techos</a>
          <a href="#estructuras">Mantenimiento</a>
        </div>
        <div>
          <strong>Contacto</strong>
          <a href={`tel:+${PHONE_CALL}`}>442 118 6062</a>
          <a
            href={`https://wa.me/${PHONE_QUOTE}`}
            target="_blank"
            rel="noreferrer"
          >
            446 125 5861
          </a>
          <a
            href="https://www.facebook.com/share/1HV5MeSkM9/?mibextid=wwXIfr"
            target="_blank"
            rel="noreferrer"
          >
            Facebook ↗
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Impertech</span>
          <span>Querétaro, México</span>
        </div>
      </footer>

      <div className={`chat-widget ${chatOpen ? "open" : ""}`}>
        {chatOpen && (
          <div className="chat-bubble">
            <button
              type="button"
              aria-label="Cerrar chat"
              onClick={() => setChatOpen(false)}
            >
              ×
            </button>
            <span>IMPERTECH</span>
            <strong>¿Cómo podemos ayudarte?</strong>
            <p>
              Cuéntanos qué necesitas y te atendemos directamente por WhatsApp.
            </p>
            <a
              href={`https://wa.me/${PHONE_QUOTE}?text=${encodeURIComponent("Hola Impertech, visité su página y necesito ayuda con un proyecto.")}`}
              target="_blank"
              rel="noreferrer"
            >
              Iniciar conversación <span>↗</span>
            </a>
          </div>
        )}
        <button
          className="chat-trigger"
          type="button"
          aria-expanded={chatOpen}
          aria-label={chatOpen ? "Cerrar ayuda por WhatsApp" : "Abrir ayuda por WhatsApp"}
          onClick={() => setChatOpen((value) => !value)}
        >
          <span aria-hidden="true">WA</span>
          <i />
        </button>
      </div>
    </main>
  );
}
