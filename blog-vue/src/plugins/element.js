import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import "./element-variables.scss";
import {
  Button,
  Input,
  Icon,
  Loading,
  Message,
  Form,
  FormItem
  // Dialog,
  // Progress,
  // Popover,
  // Pagination,
  // Tabs,
  // TabPane,
  // Badge,
  // Carousel,
  // CarouselItem,
  // Upload,
  // Select,
  // Option,
  // Collapse,
  // CollapseItem,
} from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Loading);
Vue.use(Form);
Vue.use(FormItem);
// Vue.use(Dialog);
// Vue.use(Progress);
// Vue.use(Popover);
// Vue.use(Pagination);
// Vue.use(Tabs);
// Vue.use(TabPane);
// Vue.use(Badge);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Upload);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
Vue.prototype.$message = Message;
