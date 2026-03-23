// =======================
// Centralized Asset Export
// =======================

// PNG / JPG
import BlackOptigoLogo from "./media/Black_Optigo_R_Logo.png";
import OptigoLogo from "./media/optigo_logo.png";

// SVGs
import SurveyPana from "./media/Customer Survey-pana.svg";
import HomeCel from "./media/home-cel.svg";
import OnlineWorld from "./media/Online world-cuate.svg";

// GIFs
import LoadingGif from "./media/Loading Animation.gif";

// Lottie JSON
import LoadingLottie from "./media/Loading Animation.json";

// Banners
import Banner1 from "./media/1.jpg";
import Banner2 from "./media/2.jpg";
import Banner3 from "./media/3.jpg";
import Banner4 from "./media/4.jpg";
import Banner5 from "./media/5.jpg";

// Export in a clean registry style
export const Assets = {
  logos: {
    black: BlackOptigoLogo,
    optigo: OptigoLogo,
  },
  illustrations: {
    survey: SurveyPana,
    home: HomeCel,
    onlineWorld: OnlineWorld,
  },
  animations: {
    loadingGif: LoadingGif,
    loadingLottie: LoadingLottie,
  },
  Banner: {
    banner1: Banner1,
    banner2: Banner2,
    banner3: Banner3,
    banner4: Banner4,
    banner5: Banner5,
  },
};

export default Assets;
