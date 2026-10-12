import { Navigate, Route, Routes } from "react-router-dom";
import { ChangelogPage } from "./ChangelogPage";
import { Overview } from "./Overview";
import { Shell } from "./Shell";
import { SpinnerPage } from "./SpinnerPage";
import { UseCasesPage } from "./UseCasesPage";

export function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Overview />} />
        <Route path="spinners/:slug" element={<SpinnerPage />} />
        <Route path="use-cases" element={<UseCasesPage />} />
        <Route path="changelog" element={<ChangelogPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
