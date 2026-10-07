import type { Service } from "@/types/service";
import type { City } from "@/types/city";
import { getPriceForCity } from "@/lib/content";
import { ServiceRow } from "./ServiceRow";

export function ServiceList({ services, city }: { services: Service[]; city: City }) {
  return (
    <div className="border-t border-border">
      {services.map((service, i) => (
        <ServiceRow
          key={service.slug}
          index={i + 1}
          service={service}
          city={city}
          price={getPriceForCity(city, service)}
        />
      ))}
    </div>
  );
}
