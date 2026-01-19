import {
    template
} from "@ember/template-compiler";
const EmptyState = template(`
  <div class="empty-state-container">
    <div class="empty-state">
      <span data-test-title class="empty-state-title">{{@title}}</span>
      <div class="empty-state-body">
        <p data-test-body>{{@body}}</p>
      </div>
    </div>
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default EmptyState;