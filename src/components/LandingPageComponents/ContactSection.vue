<template>
    <section class="text-white mt-20" id="contact">
        <h2 class="text-4xl font-bold text-black text-left mb-4 px-4 xl:pl-16">Contacto</h2>
        <div class="grid md:grid-cols-2 gap-4 relative px-4 xl:px-16 mt-8" data-aos="zoom-in-up">
            <div>
                <p class="text-primary font-semibold">
                    Las grandes transformaciones comienzan con un paso. Si representas una organización y quieres sumarte a Soowe, completa los siguientes datos y nos pondremos en contacto contigo enseguida. ¡Únete al cambio ahora!
                </p>
                <div class="col-lg-4 col-md-4 mb-lg-0 mt-5">
                    <div class="flex mb-10 items-center">
                        <div class="p-2 bg-white w-[50px] h-[46px] flex justify-center items-center rounded-full border border-black">
                            <img src="https://img.icons8.com/metro/50/000000/new-post.png" alt="new-post" class="w-6">
                        </div>
                        <div class="ml-5 text-black font-semibold">
                            <h4>Correo Electrónico</h4>
                            <p>Soowecontacto@gmail.com</p>
                        </div>
                    </div>
                    <div class="flex mb-10 items-center">
                        <div class="p-2 bg-white w-[50px] h-[46px] flex justify-center items-center rounded-full border border-black">
                            <img src="https://img.icons8.com/ios-filled/50/000000/phone.png" alt="phone" class="w-6">
                        </div>
                        <div class="ml-5 text-black font-semibold">
                            <h4>Teléfono</h4>
                            <p>9995074890</p>
                        </div>
                    </div>
                    <div class="flex mb-10 items-center">
                        <div class="p-2 bg-white w-[50px] h-[46px] flex justify-center items-center rounded-full border border-black">
                            <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="linkedin" class="w-6">
                        </div>
                        <div class="ml-5 text-black font-semibold">
                            <h4>LinkedIn</h4>
                            <p>www.linkedin.com/company/soowe</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-[white] w-full h-full rounded-2xl border border-[#111a3e] p-6">
                <form class="flex flex-col" data-aos="zoom-in-up">
                    <div class="mb-6">
                        <label for="email" class="text-black block mb-2 text-sm font-semibold">Correo Electrónico:</label>
                        <input type="email" id="email" class="bg-white placeholder-[#9CA2A9] text-black text-sm rounded-lg block w-full p-2.5 border border-black"
                            placeholder="email@gmail.com" name="email">
                    </div>
                    <div class="mb-6">
                        <label for="subject" class="text-black block mb-2 text-sm font-semibold">Asunto:</label>
                        <input type="text" id="subject" class="bg-white placeholder-[#9CA2A9] text-black text-sm rounded-lg block w-full p-2.5 border border-black"
                            placeholder="Asunto" name="subject">
                    </div>
                    <div class="mb-6">
                        <label for="message" class="text-black block mb-2 text-sm font-semibold">Mensaje:</label>
                        <textarea id="message" class="bg-white placeholder-[#9CA2A9] text-black text-sm rounded-lg block w-full p-2.5 border border-black"
                            placeholder="Cuéntanos más..." name="message"></textarea>
                    </div>
                    <button class="w-full px-6 py-3 rounded-full text-white bg-primary border-2 border-transparent">
                        Enviar Mensaje
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>
