import { serve } from "https://deno.land/std/http/server.ts";

async function handler(request: Request): Promise<Response> {
    try {
        // ファイルパスを設定
        const url = new URL(request.url);
        const filePath = url.pathname === "/" ? "/index.html" : url.pathname;
        const file = await Deno.readFile("." + filePath);

        // ファイルの拡張子に応じたMIMEタイプを設定
        const ext = filePath.split('.').pop();
        let contentType = "text/plain";
        if (ext === "html") contentType = "text/html";
        if (ext === "css") contentType = "text/css";
        if (ext === "js") contentType = "application/javascript";
        if (ext === "png") contentType = "image/png";
        if (ext === "jpg" || ext === "jpeg") contentType = "image/jpeg";

        return new Response(file, {
            headers: { "Content-Type": contentType }
        });
    } catch {
        // ファイルが存在しない場合のエラーハンドリング
        return new Response("404 Not Found", { status: 404 });
    }
}

serve(handler);
