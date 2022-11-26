# File-Loader.js

 
 
 
<p align="center">
  <img height="400" src="https://capsule-render.vercel.app/api?type=waving&color=539bf5&height=300&section=header&text=File-Loader.js&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Easily%20load%20files%20to%20the%20DOM%20/%20HTML&descAlignY=60&descAlign=50" />
</p>
                                                                     


   <p align="center">
    The easiest way to load scripts & stylesheets to your HTML page
  
  <br>
  <small> <b><i>Show your support!</i> </b></small>
  <br>
   <a href="https://github.com/MarketingPipeline/File-Loader.js">
    <img title="Star on GitHub" src="https://img.shields.io/github/stars/MarketingPipeline/File-Loader.js.svg?style=social&label=Star">
  </a>
  <a href="https://github.com/MarketingPipeline/File-Loader.js/fork">
    <img title="Fork on GitHub" src="https://img.shields.io/github/forks/MarketingPipeline/File-Loader.js.svg?style=social&label=Fork">
  </a>
   </p>  





## Example and usage



How to use <b><i>File Loader</b></i>:

  You can load a script / stylesheet or <b>MULTIPLE</b> scripts & stylesheets like so  -

```html
<script type="module">
import {FileLoader} from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/File-Loader.js@v1.0.0/dist/file-loader.min.js';
async function example_usage(){
  try{
    let files_to_load = await FileLoader([{url: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js", file_type:"js"}, 
    {url: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css", file_type:"css"}])
  } catch (error){
    console.log(error) 
  }
}

example_usage()
</script>
```





         

How to use <b><i>File Loader</b></i> to load files from a <b>template</b>:

You can store your file(s) to load as a <code>json</code> file and fetch them via a URL. Example below - 

```html
<script type="module">
import {FileLoader} from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/File-Loader.js@v1.0.0/dist/file-loader.min.js';
async function load_files_from_template(){
  try{
    let files_to_load = await FileLoader("https://your_project_URL_here.com/files_to_load.json")
    console.log(files_to_load)
  } catch (error){
    console.log(error) 
  }
}

load_files_from_template()
</script>
```

## Append to head

By <b><i>default</i></b> scripts & stylesheets will be appended to the <b>body</b>

You can where the file gets appended to by adding a json key named <code>append_to_head</code> - like so 

```js
FileLoader([{url: "your_script_here.js", file_type:"js", append_to_head:true}])
```

## Apply attributes

You can apply attributes like <code>defer, async, type & etc</code> to your scripts & stylesheets like so - 

```js
FileLoader([{url: "your_defer_script.js", file_type:"js", attributes: {defer: '', type:"text/javascript", your_custom_attribute:"here"}}])
```

## Contributing ![GitHub](https://img.shields.io/github/contributors/MarketingPipeline/File-Loader.js)

Want to improve this? Create a pull request with detailed changes / improvements! If approved you will be added to the list of contributors of this awesome project!

See also the list of
[contributors](https://github.com/MarketingPipeline/File-Loader.js/graphs/contributors) who
participate in this project.

## License ![GitHub](https://img.shields.io/github/license/MarketingPipeline/File-Loader.js)

This project is licensed under the MIT License - see the
[LICENSE](https://github.com/MarketingPipeline/File-Loader.js/blob/main/LICENSE) file for
details.
