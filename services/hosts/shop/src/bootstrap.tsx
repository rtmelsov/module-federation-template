import ReactDOM from "react-dom/client";
import React, { Suspense } from 'react'; // Import Suspense
import {
    RouterProvider,
} from "react-router-dom";
import { router } from "./router/Router";

// Wrap your RouterProvider with Suspense
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </Suspense>
    </React.StrictMode>
);
