import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    concat
} from "@ember/helper";
import {
    action
} from "@ember/object";
import UppyImageUploader from "discourse/components/uppy-image-uploader";
export default class FKControlImage extends Component {
    static controlType = "image";
    @tracked
    imageUrl = this.args.value;
    @action
    setImage(upload1) {
        this.args.field.set(upload1);
        this.imageUrl = upload1 ? .url;
    }
    @action
    removeImage() {
        this.setImage(undefined);
    }
    static {
        template(`
    <UppyImageUploader
      @id={{concat @field.id "-" @field.name}}
      @imageUrl={{this.imageUrl}}
      @onUploadDone={{this.setImage}}
      @onUploadDeleted={{this.removeImage}}
      @type={{@type}}
      class="form-kit__control-image no-repeat contain-image"
    />
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}