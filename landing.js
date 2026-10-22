// Keep links to the original flower story working after introducing the chooser.
if (['#sora', '#garden', '#dream', '#letter', '#end'].includes(location.hash)) {
  location.replace('gullar.html' + location.hash);
}
