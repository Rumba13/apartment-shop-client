import "./styles.scss"
import {Skeleton} from "antd";

export function ApartmentCardSkeleton() {
    return (
        <div className="apartment-card-skeleton">
            <Skeleton.Input className="image" active/>
            <Skeleton className="description" active />
        </div>
    )
}