/**!
 * @license File-Loader.js - A JavaScript library to easily load scripts / stylesheets to HTML pages - with support for loading MULTIPLE file
 * VERSION: 1.0.0
 * LICENSED UNDER MIT LICENSE
 * MORE INFO CAN BE FOUND AT https://github.com/MarketingPipeline/File-Loader.js/
 */


export function FileLoader(files_to_load) {

////// FUNCTION TO LOAD SCRIPTS TO THE DOM / DOCUMENT ////////
	async function loadFileToDOM(file_to_load) {
		return new Promise(function(resolve, reject) {

			if (!file_to_load.url) {
				throw "No File Source / URL was found to load"
			}

			let file = null;


			let file_type = file_to_load.file_type


			if (file_type != "js" && file_type != "css") {
				throw `${file_to_load.url} failed to load - no file type was found for Script-Loader.js`
			}



			if (file_type == "js") {
				file = document.createElement('script');
				file.src = file_to_load.url;
				for (const attributeName in file_to_load.attributes) {
					file.setAttribute(attributeName, file_to_load.attributes[attributeName]);
				}
			}



			if (file_type == "css") {
				file = document.createElement("link");
				file.type = "text/css";
				file.rel = "stylesheet";
				file.href = file_to_load.url;
				for (const attributeName in file_to_load.attributes) {
					file.setAttribute(attributeName, file_to_load.attributes[attributeName]);
				}
			}




			file.onload = () => {
				resolve(file_to_load);
			};
			file.onerror = () => {
				reject(file_to_load);
			};

			if (file_to_load.append_to_head) {
				/// APPEND TO HEAD IS TRUE
				document.head.appendChild(file);
			} else {
				// APPENDING TO BODY BY DEFAULT
				document.body.appendChild(file);
			}

		});
	};

////// END OF FUNCTION TO LOAD SCRIPTS TO THE DOM / DOCUMENT ///




/////// MAIN FUNCTION FOR SCRIPT /////  
	const promiseData = [];
	let filesAlreadyLoaded = ""

	async function loadFiles() {


		/// CHECK IF USER HAS PROVIDED VALID INPUT

		if (!files_to_load) {
			throw "No files to load were passed - see the github repo for proper usage"
		}

		/// CHECK IF USER IS ONLINE - DISABLED as of V1.0.0 until improved. 
		/*
		if (!navigator.onLine) {
			throw "You are disconnected from the internet!"

		}
		*/



		/// Fetch files_to_load to load from URL (JSON FILE)
		async function fetchJSON() {
			const rsp = await fetch(files_to_load),
				data = await rsp.json();
			return data

		}

		/// CHECK IF USER PASSED AN ARRAY OR URL
		if (!(files_to_load instanceof Array)) {
			/// USER DID NOT PASS AN ARRAY
			try {
				// FETCH SCRIPTS TO LOAD FROM URL
				let data = await fetchJSON()
				for (const fileToLoad in data) {
					// MAKE SURE JSON IS VALID..
					if (data[fileToLoad].file_url === undefined) {
						throw "JSON file loaded from url was not valid.."
					} else {
						// JSON WAS VALID AND CONTAINS FILE URLS TO LOAD.
						files_to_load = data
					}
				}
			} catch (error) {
				/// SOMETHING WENT WRONG :( 
				throw `Failed To Load JSON: ${error}`
			}
		} else {
			/// User is NOT loading files_to_load from a JSON url stored somewhere & is passing them locally to scriptloader()


			// make sure arrary is not empty
			if (files_to_load.length == 0) {
				throw "No files to load were passed - see the github repo for proper usage"
			}


		}


		// function to make sure files_to_load are not already loaded by user for another instance of a library...  
		function isFileAlreadyLoaded(url) {
			if (!url) url = "http://xxx.co.uk/xxx/script.js";

			let file_type = url.file_type

			let files_to_load_in_page;

			if (file_type == "js") {
				files_to_load_in_page = document.getElementsByTagName('script');
			} else {
				files_to_load_in_page = document.getElementsByTagName('link');
			}

			for (var i = files_to_load_in_page.length; i--;) {

				//console.log(files_to_load)
				if (file_type == "js") {
					if (files_to_load_in_page[i].src == url.url)
						return true;
				}
				//
				if (file_type == "css") {
					if (files_to_load_in_page[i].href == url.url)
						//console.log("gf")
						return true;

				}

			}
			return false;
		}

		files_to_load.forEach(function(file_to_load) {
			// make sure files_to_load are not already loaded by user for another library etc.. 
			// console.log(files_to_load[1])
			if (isFileAlreadyLoaded(file_to_load) === false) {
				// file is not already in the DOM
				promiseData.push(loadFileToDOM(file_to_load));
			} else {
				// File is already loaded for some reason? :o
				filesAlreadyLoaded += file_to_load.url
			}
		});
		const LoadedFiles = await Promise.all(promiseData).then(async function() {
			if (filesAlreadyLoaded.length != 0) {
				return `Scripts Have Been Loaded - these files have been avoided. They were already loaded by user / you in another script. 
${filesAlreadyLoaded}`
			} else {
				return `Scripts Have Been Loaded`
			}

		}).catch(function(error) {
			if(error.url){
			throw `File-Loader.js Error: ${error.url} failed to load! File Type Set To - ${error.file_type}`;
			}else{
			throw `File-Loader.js Error: ${error}`;	
			}
		});

		return await LoadedFiles
	}



	return loadFiles()
/// END OF MAIN FUNCTION FOR SCRIPT ////  	
}
