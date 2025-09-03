import ToDoPage from "@/page/todopage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const RoutePages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDoPage />} />
      </Routes>
    </BrowserRouter>
  );
};
