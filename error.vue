<template>
    <div
        class="h-screen flex flex-col justify-center items-center text-center px-4"
    >
        <h2 class="text-2xl md:text-3xl font-bold mb-4">
            Sorry, this page is not available
        </h2>
        <span class="mb-8"
            >Maybe the page you are looking for has been moved.</span
        >
        <button
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
            @click="navigateTo('/')"
        >
            Home
        </button>
    </div>
</template>
