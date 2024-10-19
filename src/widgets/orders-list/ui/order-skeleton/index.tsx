import "./styles.scss"
import {Skeleton} from "antd";

export function OrderSkeleton() {
    return <div className="order-skeleton">
        <Skeleton className="small-skeleton" active style={{height: 150}}/>
        <Skeleton.Input active style={{height:"100%"}}/>
        <Skeleton active style={{height: 150}}/>
    </div>
}
