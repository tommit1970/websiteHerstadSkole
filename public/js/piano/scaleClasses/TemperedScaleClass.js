class TemperedScale {
	constructor(frequency){
		this.frequency = frequency;
		this.topFrequency = frequency*2;
		this.toneNameArray = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#','A'];
		this.freqArray = [];
	}

	calculateAllTemperedFrequencies(){
		this.freqArray.push(parseFloat(this.frequency.toFixed(2)));
		for(var cent = 100; cent < 1200; cent+=100){
			this.freqArray.push(parseFloat(this.calculateOneTemperedFrequency(cent).toFixed(2)));
		}
		this.freqArray.push(parseFloat(this.topFrequency.toFixed(2)));
	}
	
	calculateOneTemperedFrequency(cent){
		var unknownFreqency = this.frequency*Math.pow(2, (cent/1200));
		return unknownFreqency;
	}
	
	printFrequencies(){
		console.log("Tempered Scale:");
		var string = "";
		for(var i = 0; i < this.freqArray.length; i++){
			string = `Tone ${this.toneNameArray[i]} - ${this.freqArray[i]}`;
			console.log(string);
		}
	}
}

// module.exports = TemperedScale; // node.js stuff