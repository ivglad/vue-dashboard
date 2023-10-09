import { ref, watch } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";

export const useCardsStore = defineStore("cards", () => {
  const getFromLocalStorage = (itemName) => {
    try {
      const data = localStorage.getItem(itemName);
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(itemName);
      return null;
    }
  };

  const cards = ref([]);
  const draggableModeOn = ref();
  cards.value = getFromLocalStorage("cards");
  draggableModeOn.value = getFromLocalStorage("draggableModeOn");
  
  if (!draggableModeOn.value) {
    draggableModeOn.value = true;
  }

  if (!cards.value) {
    cards.value = [
      {
        id: Date.now(),
        title: "Нью-Йорк",
        description:
          "Один из крупнейших городов США, известный своими небоскребами, такими как Эмпайр-стейт-билдинг, Таймс-сквер и Статуя Свободы.",
      },
      {
        id: Date.now() + 1,
        title: "Токио",
        description:
          "Столица Японии, современный и динамичный город, известный своими небоскребами, ночными огнями и технологическими достижениями.",
      },
    ];
  }

  const saveToLocalStorage = () => {
    localStorage.setItem("cards", JSON.stringify(cards.value));
    localStorage.setItem(
      "draggableModeOn",
      JSON.stringify(draggableModeOn.value)
    );
  };

  const add = (cardData) => {
    const { title, description } = cardData;
    cards.value.push({
      id: Date.now(),
      title,
      description,
    });
  };

  const remove = (cardIndex) => {
    cards.value.splice(cardIndex, 1);
  };

  watch([cards, draggableModeOn], saveToLocalStorage, { deep: true });

  return {
    cards,
    draggableModeOn,
    getFromLocalStorage,
    saveToLocalStorage,
    add,
    remove,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCardsStore, import.meta.hot));
}
