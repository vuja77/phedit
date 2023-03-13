const fileInp = document.querySelector("#fl-inp");
const chosePh = document.querySelector("#chose-ph");
const pregledSlike = document.querySelector(".slika img");
const filOpt = document.querySelectorAll(".filter-options button");
const rangeInp = document.querySelector("#range");
const resetfil = document.querySelector("#rs-filters");
const rotatefil = document.querySelectorAll(".rt-fl");
const saveBtn = document.querySelector("#save");
const flname = document.querySelector("#flNm");
let br = 100,
ca = 100,
sat =100,
gray = 0,
hue = 0,
blur = 0,
flipH = 1,
flipV = 1,
rotate = 0;


fileInp.addEventListener("change", (e) => {
	let file = fileInp.files[0];
	pregledSlike.src = URL.createObjectURL(file);


})

chosePh.addEventListener("click", (e) => {
	fileInp.click();
});

filOpt.forEach((opt) => {
	opt.addEventListener("click", (e) => {
		document.querySelector(".filter-options .active").classList.remove("active");
		opt.classList.add("active");

		if(opt.id == "br") {
			rangeInp.value = br;
			rangeInp.setAttribute("max", 200);
				flname.innerText ="brightness"
		} else if (opt.id == "ca") {
			rangeInp.value = ca;
			rangeInp.setAttribute("max", 200);
				flname.innerText ="Contrast"


		}else if (opt.id == "sat") {
			rangeInp.value = sat;
			rangeInp.setAttribute("max", 200);
				flname.innerText ="Saturation"


		}else if (opt.id == "gray") {
			rangeInp.value = gray;
			rangeInp.setAttribute("max", 100);
			flname.innerText ="Invert"

		}else if (opt.id == "hue-rotate") {
			rangeInp.value = hue;
			rangeInp.setAttribute("max", 360);
				flname.innerText ="Hue-rotate"

		}else if (opt.id == "blur") {
			rangeInp.value = blur;
			rangeInp.setAttribute("max", 100);
				flname.innerText ="Blur"

		}
	})
})
const applyFilter = () => {
	pregledSlike.style.filter = `brightness(${br}%) saturate(${sat}%) contrast(${ca}%) invert(${gray}%) blur(${blur}px) hue-rotate(${hue}deg)`;
	pregledSlike.style.transform = `rotate(${rotate}deg) scaleX(${flipH}) scaleY(${flipV})`;
}
const rotateFilter = () => {
	

}
rangeInp.addEventListener("input", (e) => {
	let selectedFilter = document.querySelector(".filter-options .active");
	if(selectedFilter.id == "br") {
			br = rangeInp.value;

	}else if (selectedFilter.id == "ca") {
			ca = rangeInp.value;

	}else if (selectedFilter.id == "sat") {
			sat = rangeInp.value;

	}else if (selectedFilter.id == "gray") {
			gray = rangeInp.value;

	}else if (selectedFilter.id == "hue-rotate") {
			hue = rangeInp.value;

	}else if (selectedFilter.id == "blur") {
			blur = rangeInp.value;

	}

	applyFilter();
})

rotatefil.forEach((rt) => {
	rt.addEventListener("click", (e) => {
		if(rt.id == "left") {
			rotate-= 90;
		} else if(rt.id == "right"){
			rotate += 90;
		} else if (rt.id == "flip-h") {
			if(flipH == 1) {
				flipH  = -1;
			} else {
				flipH  = 1;
			}
		
		}else if (rt.id == "flip-v") {
			if(flipV == 1) {
				flipV  = -1;
			} else {
				flipV  = 1;
			}
		}
		applyFilter();
	})
})

const saveImage = () => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = pregledSlike.naturalWidth;
	canvas.height = pregledSlike.naturalHeight;
	console.log("a");
	ctx.translate(canvas.width / 2,  canvas.height / 2);
	ctx.filter = `brightness(${br}%) saturate(${sat}%) contrast(${ca}%) invert(${gray}%) blur(${blur}px) hue-rotate(${hue}deg)`;	
	if(rotate !== 0) {
		ctx.rotate(rotate * Math.PI / 180);
	}
	ctx.scale(flipH, flipV);
	ctx.drawImage(pregledSlike, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
	document.body.appendChild(canvas);
	const link = document.createElement("a");
	link.download = "slika.jpg";
	link.href = canvas.toDataURL();
	link.click();
}

saveBtn.addEventListener("click", (e) => {
	saveImage();
})
resetfil.addEventListener("click", (e) => {
br = 100;
ca = 100;
sat =100;
gray = 0;
blur = 0;
hue =  0;
console.log("ss");
	applyFilter();

})