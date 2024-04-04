const TAU = 2 * Math.PI;

const forums =
    [
	["x_val1", "y_val1", "red"],
	["x_val2", "y_val2", "blue"]
    ];

function drawVector(to, canvas, color){
    let ctx = canvas.getContext('2d');
    let center = new Vector3([canvas.width / 2, canvas.height / 2, 0]);
    
    to.mul(20);
    to.elements[1] *= -1;
    to.add(center);

    ctx.beginPath();
    ctx.moveTo(center.elements[0], center.elements[1]);
    ctx.lineTo(to.elements[0], to.elements[1]);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function get_forum_vec(forum){
    let x = document.getElementById(forum[0]).value;
    let y = document.getElementById(forum[1]).value;

    let vec = new Vector3([x, y, 0]);
    
    return vec;
}

function handleDrawEvent(){
    let canvas = document.getElementById('example');
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    


    forums.forEach((forum, index) => {
	let color = forum[2];
	
	let to = get_forum_vec(forum)
	drawVector(to, canvas, color);
    })
    
}

function handleDrawOperationEvent(){
    handleDrawEvent();

    let canvas = document.getElementById('example');
    let ctx = canvas.getContext('2d');
    
    let operation_selection = document.getElementById("operation_select").value

    let from = new Vector3([canvas.width / 2, canvas.height / 2, 0]);

    let scalar = document.getElementById("operation_scalar").value;
    
    let vec_1 = get_forum_vec(forums[0]);
    let vec_2 = get_forum_vec(forums[1]);

    let [prod_scalar, prod_bivector] = Vector3.geometric_product(vec_1, vec_2);
    
    switch (operation_selection) {
    case "add":
	drawVector(vec_1.add(vec_2), canvas, "green");
	break;
    case "sub":
	drawVector(vec_1.sub(vec_2), canvas, "green");
	break;
    case "mul":
	drawVector(vec_1.mul(scalar), canvas, "green");
	drawVector(vec_2.mul(scalar), canvas, "green");
	break;
    case "div":
	drawVector(vec_1.div(scalar), canvas, "green");
	drawVector(vec_2.div(scalar), canvas, "green");
	break;
    case "mag":
	console.log("Magnitude v1: ", vec_1.magnitude());
	console.log("Magnitude v2: ", vec_2.magnitude());
	break;
    case "nor":
	drawVector(vec_1.normalize(), canvas, "green");
	drawVector(vec_2.normalize(), canvas, "green");
	break;
    case "ang":
	let vecs_mag = vec_1.magnitude() * vec_2.magnitude();
	let cos_angle = prod_scalar/vecs_mag;
	let sin_angle = ((new Vector3(prod_bivector)).magnitude())/vecs_mag;
	console.log("Angle: ", Math.atan2(sin_angle, cos_angle) * (360/TAU));
	break;
    case "are":
	let bivector_span = (new Vector3(prod_bivector)).magnitude();

	console.log("Area of the triangle: ", bivector_span / 2);
	break;
    default:	
	console.error("Unknown operation: ", operation_selection);
    }
}


function main() {
    forums.forEach((forum, index) => {
	document.getElementById(forum[0]).value = 0;
	document.getElementById(forum[1]).value = 0;
    })
	    
    document.getElementById("draw_vector_button").addEventListener("click", (event) => {
	handleDrawEvent();
    });

    document.getElementById("draw_operation_button").addEventListener("click", (event) => {
	handleDrawOperationEvent();
    });

    handleDrawEvent();
}



