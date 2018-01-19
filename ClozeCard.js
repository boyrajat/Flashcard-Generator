
var ClozeCard = function(text, cloze) {
	
	if (this instanceof ClozeCard) {

	var textToLower = text.toLowerCase();
	var clozeToLower = text.toLowerCase();

	 if (!textToLower.includes(clozeToLower)) {
	 	console.log('ERROR - Cloze-Deletion does not appear within full text --- <' + cloze + '>');
	 	return;
	 }
	 this.full = text;
	 this.cloze = cloze;
	 this.partial = text.replace(cloze, '........');
	 } else {
	 	return new ClozeCard(text, cloze);
	 }
	}

module.exports = ClozeCard;

