import { defineStore } from "pinia";

export default defineStore("tarBar", function() {

  let activeIndex = $ref<number>(0);
  
  function setActiveIndex(currentIndex:number) {
    activeIndex = currentIndex;
  }

  return $$({
    activeIndex,
    setActiveIndex,
  });
});
