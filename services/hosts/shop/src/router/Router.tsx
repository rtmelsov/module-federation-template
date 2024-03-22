import { App } from "@components/App";
import { Shop } from "@pages/index"
import {
    createBrowserRouter,
} from "react-router-dom"


const route = [
    {
        path: "/shop",
        element: <App />,
        children: [
            { path: '/shop/main', element: <div><Shop /></div> },
            { path: '/shop/price', element: <div><div style={{ color: 'red' }}>Hello</div></div> }
        ]
    },
]

export const router = createBrowserRouter(route);

export default route;
