//全局变量
var canvas;
var context;

window.onload = function(){
	//取得<canvas>和绘图上下文
	canvas = document.getElementById("drawingCanvas");
	context = canvas.getContext("2d");

	//添加用于实现绘图操作的事件处理程序
	canvas.onmousedown = startDrawing;
	canvas.onmouseup = stopDrawing;
	canvas.onmouseout = stopDrawing;
	canvas.onmousemove = draw;
};

//var defalutColor = context.strokeStyle;
//var defalutThickness = context.lineWidth;

//changColor函数
//记录此前为选择颜色而被单击过的<img>元素
var previousColorElement;

function changeColor(color, imgElement){
	//重新设置当前绘图要使用的颜色
	context.strokeStyle = color;

	//为刚被单击的<img>元素应用一个新样式(加黑色实心边框)
	imgElement.className = "Selected";

	//恢复上一次被单击的<img>元素的样式
	if(previousColorElement != null){
		previousColorElement.className = "";

	}
	//如果上次单击的元素与此次相同，绘图恢复默认颜色
	if(previousColorElement == imgElement){
		context.strokeStyle = "black";
		previousColorElement = null;
	}else{
		//把当前img设置为下一次单击时的previousElement
		previousColorElement = imgElement;
	}
}

//changeThickness函数
//记录之前为选择粗细而被单击过的<img>元素
var previousThicknessElement;

function changeThickness(thickness, imgElement){
	//设置当前绘图要使用的画笔粗细
	context.lineWidth = thickness;

	//为刚被单击的<img>元素应用一个新样式
	imgElement.className = "Selected";

	//恢复上一次被单击的<img>元素的样式
	if(previousThicknessElement != null){
		previousThicknessElement.className = "";
	}

	//如果上次单击的元素与此次相同，绘图恢复默认粗细
	if(previousThicknessElement == imgElement){
		context.lineWidth = 1;
		previousThicknessElement = null;
	}else{
		//把当前img设置为下一次单击时的previousElement
		previousThicknessElement = imgElement;
	}
}

//设置是否开始画的标志位
var isDrawing = false;

function startDrawing(e){
	//开始绘图了
	isDrawing = true;

	//创建新路径
	context.beginPath();

	//把画笔放到鼠标当前所在位置
	//onmousedown事件本身提供了坐标（pageX和pageY），但这两个坐标值是相对于整个页面的
	//我们需要的是相对于画布左上角的坐标值，所有需要再减去浏览器左上角到画布左上角的距离
	context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

//用户移动鼠标（onmousemove)，draw函数就会被调用
function draw(e){
	if(isDrawing == true){
		//找到鼠标新位置
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;

		//画一条到新位置的线
		context.lineTo(x,y);
		context.stroke();
	}
}

//用户释放鼠标或把鼠标移到画布外时，停止绘图
function stopDrawing() {
	isDrawing = false;
}

//清除按钮
function clearImg() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}
//保存按钮
function saveImg() {
	//找到saveImg元素
	var saveImg = document.getElementById("saveImg");

	//在图像中显示画布数据
	saveImg.src = canvas.toDataURL();

	//显示包含saveImg元素的div
	var saveImgContainer = document.getElementById("saveImgContainer");
	saveImgContainer.style.display = "block";
}





