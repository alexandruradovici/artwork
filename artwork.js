$(document).ready (function ()
{
	var audio = null;
	var playing = null;
	var language = "ro";

	function normalButtons ()
	{
		for (var item=1;item<25; item++)
		{
			$('.item[data-value="'+item+'"]').attr ('src', 'graphics/btn_'+item+'.png');
		}
	}

	function selectButton (item)
	{
		$('.item[data-value="'+item+'"]').attr ('src', 'graphics/btn_'+item+'_play.png');
	}

	function playedButton (item)
	{
		$('.item[data-value="'+item+'"]').attr ('src', 'graphics/btn_'+item+'_played.png');
	}

	function selectLanguage (l)
	{
		language = l;
		$('.language').attr ('src', 'graphics/'+language+'_btn.png');
		normalButtons ();
	}

	function init ()
	{
		var menu = $("#menu");
		for (var i=0; i<8; i++)
		{
			var tr = $('<tr></tr>');
			menu.append (tr);
			tr.append ('<td width="10%"></td>');
			for (var item=0; item<3; item++)
			{
				tr.append ('<td align="center"><img class="item normal" data-value="'+((i*3)+(item+1))+'" src="graphics/btn_'+((i*3)+(item+1))+'.png" width="90%"></td>');
			}
			tr.append ('<td width="10%"></td>');
		}
		menu.append ('<tr><td colspan="5" align="right"><img class="language" src="graphics/'+language+'_btn.png" width="14%"></td></tr>');

		$(document).on ('click', '.item', function (e)
		{
			var value = $(this).data ('value');
			playedButton (playing);
			playing = value;
			selectButton (value);
			if (audio)
			{
				audio.pause ();
				audio.src = '';
			}
			audio = new Audio('mp3/'+value+language+'.mp3');
			audio.play();
			(function (item)
			{
				audio.addEventListener('ended', function ()
				{
					playedButton (item);
				});
			})(playing);
		});

		$(document).on ('click', '.language', function (e)
		{
			if (language === "ro") selectLanguage ("en");
			else selectLanguage ("ro");
		});
	}

	init ();
});