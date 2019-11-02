var myApp = new Framework7({
	id : 'com.location.test',
	root : "#app1",
	theme : "md",
	modalTitle : 'location',
	material : true,
	init : true,
	on : {
		init : function() {
		}
	},
	routes : [{
		name : 'home',
		path : '/home/',
		url : './home.html',
	}, {
		path : '/publication/',
		url : './publier.html',
	}, {
		path : '/publier/',
		url : './publier.html'
	}],
});

var $$ = Dom7;
var myView = myApp.views.create("#vuePrincipale");
var db;

$(function() {
	$$(document).on('page:init', '.page[data-name="publier"]', function() {
		$("#accessCamera").on("click", accessCamera);
		$('#partagerArticle').click(function() {
			var photo = $("#imageTest").attr("src");

			var donnes = {
				"ac" : 11,
				"categorie" : $("#categorie").val(),
				"prix" : $("#prix").val(),
				"ville" : $("#ville1").val(),
				"contact" : $("#contact").val(),
				"description" : $("#description").val(),
				"image" : photo,
			};
			$.ajax({
				url : "http://127.0.0.1/locationServer/action.php",
				type : 'post',
				data : donnes,
				success : function(data) {
					alert("From server:\n" + data);
					$("#fermerPulbier").trigger("click");

				}
			});
			//alert($("#imageTest").attr("src"));
		});
		$("#imageTest").click(function() {
			$("#imageTest").on("click", accessCamera);
		});

	});
	$$(document).on('page:init', '.page[data-name="home"]', function() {
		loadCommentaire();
		loard();
		setInterval(function() {
			refresh();
		}, 3000);
		$("#testBtn").click(function() {
			alert("bien");
			$("#partagerArticle").trigger("click");
		});
		

		$("#btnCommentaire").click(function() {
			var donnes = {
				"ac" : 14,
				"commentaire" : $("#commentaireZone").val(),
			};
			$.ajax({
				url : "http://127.0.0.1/locationServer/action.php",
				type : 'post',
				data : donnes,
				success : function(data) {
					alert("good");

				}
			});
		});

		function loadCommentaire() {
			var donnes = {
				"ac" : 5,
				"idPublication" : 4,
			};
			$.ajax({
				url : "../locationServer/action.php",
				type : "post",
				data : donnes,
				success : function(data) {
					data = eval(data);
					var commentaire ="";
					for (var i = 0; i < data.length; i++) {
						commentaire = '<div class="list">Good hire' + '<ul>' + '<li>'+'<a style="color:#742137;" class="list-button item-link" href="#">'+data[i].nomUtilisateur+' <span style="color:black; font-family:"Palatino Linotype", "Book Antiqua", Palatino, serif; font-size:15px;">'+data[i].contenu+'</span></a>' + '</li>' + '<li>' + '' + '</li>' + '</ul>' + '</div>';
					}
					$("#zoneCommentaire").append(commentaire);
					
				}
			});
		}

		function refresh() {
			var donnes = {
				"ac" : 3,
				"dernier" : $("#lesPublications .card:first").attr("idelt")
			};
			$.ajax({
				url : "../locationServer/action.php",
				type : 'post',
				data : donnes,
				success : function(data) {
					data = eval(data);
					var text = "";
					for (var i = 0; i < data.length; i++) {
						text += '<div idelt="' + data[i].idPucation + '" class="card demo-facebook-card">' + '<div class="card-header">' + '<div class="demo-facebook-avatar"><img src="http://127.0.0.1/locationServer/img/' + data[i].nomImage + '" style="border-radius: 50%;" width="34" height="34"/>' + '</div>' + '<div class="demo-facebook-name">' + '	<span style="color:#c12d60;">' + data[i].idUtilisateur + '</span>' + '</div>' + '' + '<div style="font-size:10px;" class="demo-facebook-date">' + '	' + data[i].date + '' + '</div>' + '</div>' + '<div class="card-content">' + '	<img src="http://127.0.0.1/locationServer/img/' + data[i].nomImage + '" width="100%"/>' + '</div>' + '<div class="card-content card-content-padding">' + '	<p class="date">' + '		' + data[i].categorie + ',<span style="color:#c12d60;"> $' + data[i].prix + ' <div class="right"><i style="color:#c12d60;" class="icon material-icons ">location_on</i>' + data[i].ville + '</div></span>' + '	</p>' + '	<p ><div align="justify">' + '		' + data[i].description + '' + '	</div></p>' + '	<div class="card-footer">' + '		<a href="#" class="link popover-open zoneCommentaire" data-popover=".commentaire"><img src="img/comment.png" /><span style="color:#c12d60;"> 12 </span></a>' + '		<a href="tel:' + data[i].contact + '" class="link external"><img style="width:22px;" src="img/phone.png" /></a>' + '		<a id="shareSocial" href="#" class="link"><img style="width:25px;" src="img/shareforward.png" /></a>' + '	</div>' + '</div>' + '</div>';

					}
					$("#lesPublications").prepend(text);

				}
			});
		}

		function loard() {

			var donnes = {
				"ac" : 1,
			};
			$.ajax({
				url : "../locationServer/action.php",
				type : 'post',
				data : donnes,
				success : function(data) {
					data = eval(data);
					var text = "";
					for (var i = 0; i < data.length; i++) {
						text += '<div idelt="' + data[i].idPucation + '" class="card demo-facebook-card">' + '<div class="card-header">' + '<div class="demo-facebook-avatar"><img src="http://127.0.0.1/locationServer/img/' + data[i].nomImage + '" style="border-radius: 50%;" width="34" height="34"/>' + '</div>' + '<div class="demo-facebook-name">' + '	<span style="color:#c12d60;">' + data[i].idUtilisateur + '</span>' + '</div>' + '' + '<div style="font-size:10px;" class="demo-facebook-date">' + '	' + data[i].date + '' + '</div>' + '</div>' + '<div class="card-content">' + '	<img src="http://127.0.0.1/locationServer/img/' + data[i].nomImage + '" width="100%"/>' + '</div>' + '<div class="card-content card-content-padding">' + '	<p class="date">' + '		' + data[i].categorie + ',<span style="color:#c12d60;"> $' + data[i].prix + ' <div class="right"><i style="color:#c12d60;" class="icon material-icons ">location_on</i>' + data[i].ville + '</div></span>' + '	</p>' + '	<p ><div align="justify">' + '		' + data[i].description + '' + '	</div></p>' + '	<div class="card-footer">' + '		<a  href="#" data-popover=".commentaire" class="link popover-open" ><img src="img/comment.png" /><span style="color:#c12d60;"> 12 </span></a>' + '		<a href="tel:' + data[i].contact + '" class="link external"><img style="width:22px;" src="img/phone.png" /></a>' + '		<a id="shareSocial" href="#" class="link"><img style="width:25px;" src="img/shareforward.png" /></a>' + '	</div>' + '</div>' + '</div>';

					}
					$("#lesPublications").append(text);
				}
			});

		}


		$("#shareSocial").click(function() {
			navigator.share("Visites cette maison https://nfinic.com", "Parage location", "text/plain");
		});

		$("#pulierParLien").click(function() {
			alert("merci seigneur");
			$("#plubierParImage").trigger("click");
		});

	});

	$$(document).on('page:init', function() {
		$("#connexion").click(function() {
			alert("connected");
			window.location.assign("home.html");
		});
	});

	function accessCamera() {
		$("#accessCamera").css("display", "none");
		var permissions = cordova.plugins.permissions;
		permissions.hasPermission(permissions.CAMERA, function(status) {
			if (status.hasPermission) {
				var options = {
					destinationType : Camera.DestinationType.DATA_URL,
					sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
				};

				navigator.camera.getPicture(function(imagedata) {
					$("#imageTest").attr("src", imagedata);
					var image = document.getElementById('imageTest');
					image.src = "data:image/jpeg;base64," + imagedata;
				}, function(message) {
					alert('Failed because: ' + message);
				}, options);

				$(".no-hairlines-md").show();

			} else {
				permissions.requestPermission(permissions.CAMERA, function() {
					var options = {
						destinationType : Camera.DestinationType.DATA_URL,
						sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
					};
					navigator.camera.getPicture(onSuccess, onFail, options);
					$(".no-hairlines-md").show();
				});
			}
		});

	}


	$("#connetion").click(function() {
		alert("connected");
		window.location.assign("home.html");

	});
	$("#partagerArticle").click(function() {
		alert("confirmer");
	});
	$(".zoneCommentaire").click(function() {
		alert("zoneCommentaire");
	});

});

