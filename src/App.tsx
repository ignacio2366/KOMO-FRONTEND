import "./App.css";
import { Navigation, Footer } from "@/components";
import { RoutePages } from "./routes/route";

function App() {
  return (
    <>
      <Navigation />
      <RoutePages />
      <Footer />
    </>
  );
}
export default App;
