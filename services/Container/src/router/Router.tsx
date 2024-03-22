import { App } from "@components/App";
import { createBrowserRouter } from "react-router-dom";
// @ts-ignore
import shopRoutes from 'shop/Router';
// @ts-ignore
import aboutRouters from 'about/Router';
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            ...aboutRouters,
            ...shopRoutes
        ]
    },
]);