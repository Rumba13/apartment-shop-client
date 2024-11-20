import "./styles.scss";
import { Skeleton } from "antd";

type PropsType = {
   textSkeletonWidth: string;
};

export function TagSkeleton({ textSkeletonWidth }: PropsType) {
   return (
      <div className="tag-skeleton">
         <Skeleton.Node className="tag-skeleton-checkbox" style={{ width: 20, height: 20 }} active />
         <Skeleton.Input
            className="tag-skeleton-input"
            style={{
               height: 20,
               marginLeft: 10,
               marginTop: 1,
               maxWidth: textSkeletonWidth,
            }}
            active
         />
      </div>
   );
}
