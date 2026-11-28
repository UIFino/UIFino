import { HomeCatalogShowcase } from "./catalog-showcase";
import { HomeCategoryGrid } from "./category-grid";
import { HomeHeroStage } from "./hero-stage";
import { HomeStudiosStrip } from "./studios-strip";
import { HomeStylesAndTemplatesStrip } from "./styles-templates-strip";

export function HomeFeatureView() {
  return (
    <div>
      <HomeHeroStage />
      <div className="wireframe-spacer">
        <div className="wireframe-spacer-inner" />
      </div>
      <HomeCatalogShowcase />
      <div className="wireframe-spacer">
        <div className="wireframe-spacer-inner" />
      </div>
      <HomeStylesAndTemplatesStrip />
      <div className="wireframe-spacer">
        <div className="wireframe-spacer-inner" />
      </div>
      <HomeCategoryGrid />
      <div className="wireframe-spacer">
        <div className="wireframe-spacer-inner" />
      </div>
      <HomeStudiosStrip />
    </div>
  );
}
