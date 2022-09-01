//fetch('file:///Users/ahui/www/mdview/index.md').then(async r=>console.log(await r.text()))

//let r = Deno.readDirSync('.')
//for(const f of r){ console.log(f) }

    import com from './routes/p/[...path].tsx'
    import { renderToString } from "preact-render-to-string";
    console.log(renderToString(com))
