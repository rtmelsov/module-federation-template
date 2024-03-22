import { App } from "@components/App";
import { About } from "@pages/index"
import {
    createBrowserRouter,
} from "react-router-dom"


const route = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: '/about', element: <div><About /></div> }
        ]
    },
]

export const router = createBrowserRouter(route);

export default route;
