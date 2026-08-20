import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { ModulesList } from './pages/ModulesList';
import { ModuleView } from './pages/ModuleView';
import { ScenarioDrill } from './pages/ScenarioDrill';
import { ReviewSession } from './pages/ReviewSession';
import { FieldTestSimulator } from './pages/FieldTestSimulator';
import { ProductMap } from './features/product-map/ProductMap';
import { QuickReference } from './features/reference/QuickReference';
import { ShiftSimulator } from './pages/ShiftSimulator';
import { Mistakes } from './pages/Mistakes';
import { Progress } from './pages/Progress';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="modules" element={<ModulesList />} />
          <Route path="modules/:moduleId" element={<ModuleView />} />
          <Route path="scenarios/:scenarioId" element={<ScenarioDrill />} />
          <Route path="review" element={<ReviewSession />} />
          <Route path="simulator" element={<FieldTestSimulator />} />
          <Route path="map" element={<ProductMap />} />
          <Route path="reference" element={<QuickReference />} />
          <Route path="shift" element={<ShiftSimulator />} />
          <Route path="mistakes" element={<Mistakes />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-2xl font-bold text-textMain mb-4">Under Construction</h2>
              <p className="text-textMuted">This section is being built.</p>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
