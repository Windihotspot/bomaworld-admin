<script setup>
import MainLayout from '@/layouts/full/MainLayout.vue';
  const products = [
    {
        name: "Strawberry",
        price: "3000",
        image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3RyYXdiZXJyeXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        name: "Cabbage",
        price: "4000",
        image: "https://images.unsplash.com/photo-1611105637889-3afd7295bdbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FiYmFnZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        name: "Broccoli",
        price: "2000",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJyb2NvbGxpfGVufDB8fDB8fHww",
    },
    {
        name: "Fresh Apple",
        price: "1000",
        image: "https://images.unsplash.com/photo-1623815242959-fb20354f9b8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlc2glMjBhcHBsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
];
</script>

<template>
  <MainLayout>
       <!-- Products section -->
       <div class="p-6 bg-gray-100">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-semibold">
                                Popular Products
                            </h2>
                            <a href="#" class="text-green-500 hover:underline"
                                >View More</a
                            >
                        </div>

                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6"
                        >
                            <div
                                v-for="product in products"
                                :key="product.id"
                                class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition relative"
                            >
                                <!-- <button
                                    class="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                                >
                                    <i class="fas fa-heart"></i>
                                </button> -->

                                <img
                                :src="product.image"
                                :alt="product.name"
                                class="w-full h-32 object-cover rounded-lg"
                            />

                                <h3 class="text-md font-normal mt-4">
                                    {{ product.name }}
                                </h3>
                                <p class="text-gray-500 text-sm">
                                    Lorem ipsum dolor sit amet.
                                </p>

                                <div
                                    class="flex justify-between items-center mt-4"
                                >
                                    <span
                                        class="text-green-500 font-bold text-lg"
                                        >₦{{ product.price }}
                                        <span class="text-sm">/kg</span></span
                                    >

                                    <i class="fas fa-plus text-green-600"></i>
                                </div>
                            </div>
                        </div>
                    </div>
  </MainLayout>
</template>

<style scoped>
.h-8 {
  height: 2rem;
}
.custom-btn {
  background-color: #1f5aa3;
  text-transform: none;
}
v-btn {
  text-transform: none;
}
</style>
