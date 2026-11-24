import { Suspense } from "react";
import EditEvent from "./EditEvent";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditEvent />
        </Suspense>
    );
}