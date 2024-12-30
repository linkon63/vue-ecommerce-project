<template>
    <div
        id="hero"
        class="pt-6 px-6 lg:px-20 overflow-hidden grid grid-cols-2 h-[100vh] gap-8"
        style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
    >
        <div class="mx-6 md:mx-20 mt-0 md:mt-6 flex items-center">
            <div>
                <h1 class="text-6xl font-bold text-gray-900 leading-tight transition ease-linear duration-500 hover:scale-105">
                    <span class="font-light block">Welcome to e-Shop – Quality Products at Your Fingertips!</span>Discover the best deals, handpicked products, and fast delivery, all in one place.
                </h1>
                <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">Shop Now" | "Explore Categories</p>
                <Button label="All Products" as="router-link" to="/products" rounded class="!text-xl mt-8 !px-4"></Button>
            </div>
        </div>
        <div class="flex justify-start md:justify-end transition ease-linear duration-500 hover:scale-125">
            <!-- <img src="/demo/images/landing/screen-1.png" alt="Hero Image" class="w-9/12 md:w-auto" /> -->
            <img src="https://www.pngall.com/wp-content/uploads/4/Headphone-Transparent-PNG.png" alt="Hero Image" class="w-9/12 md:w-full" />
        </div>
    </div>
</template>
