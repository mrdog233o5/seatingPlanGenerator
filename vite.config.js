import { obfuscator } from 'rollup-obfuscator';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        // ...
        obfuscator()
    ]
})