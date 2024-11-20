import "./styles.scss";
import { Field } from "formik";

export function CommentField() {
   return (
      <div className="comment-field">
         <h2 className="comment-title article-title">Комментарии к заявке</h2>

         <Field className="comment__field" name="comment" as="textarea" placeholder="Например, другое время заезда или выезда, будет ли связь после пересечения границы или какой способ оплаты предпочтительнее" />
      </div>
   );
}
