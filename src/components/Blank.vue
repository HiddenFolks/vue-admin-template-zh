<template>
    <div>
        现在,
        <span class="type"></span>
    </div>
</template>
<script>
import Typed from "typed.js";
export default {
    name:"blank",
    data(){
        return {};
    },
    mounted(){
        let typed = new Typed(".type", {
      strings: [" 你可以从这里开始.Hello,World!"],
      typeSpeed: 100,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true
    });

},
methods: {}
};
</script>