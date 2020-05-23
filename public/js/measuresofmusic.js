class Measure {

	constructor(resolutionPerBeat = 1, beatsPerMeasure = 4, instruments = 4){
		this._resolutionPerBeat = resolutionPerBeat;
		this._beatsPerMeasure = beatsPerMeasure;
		this._numOfInstruments = instruments;
		this._measureArray = [];
		this._tempo = 120;
		this._timeCodesII = [0];
		for(var i = 0; i < this._beatsPerMeasure * this._resolutionPerBeat * this._numOfInstruments; i++){
				this._measureArray.push(0);
		}
	}


	get measureArr(){ // getters name must differ from instance-variablename (measureArr is not equal to measureArray)
		return this._measureArray;
	}

	set measureArr(x){
		this._measureArray = x;

	}

	togglePointInMeasureArr(index){
		this._measureArray[index] ? this._measureArray[index] = 0 : this._measureArray[index] = 1;
	}

	get tempo(){
		return this._tempo;
	}

	set tempo(x){
		this._tempo = x;
	}

	tempoInc(){
		this._tempo++;
	}

	tempoDec(){
		this._tempo--;
	}

	get numOfInstruments(){
		return this._numOfInstruments;
	}

	set numOfInstruments(x){
		this._numOfInstruments = x;
	}

	get beatsPerMeasure(){
		return this._beatsPerMeasure;
	}

	set beatsPerMeasure(x){
		this._beatsPerMeasure = x;
	}

	get resPerBeat(){
		return this._resolutionPerBeat;
	}

	set resPerBeat(x){
		this._resolutionPerBeat = x;
	}

	get timeCodesII(){
		return this._timeCodesII;
	}

	calculateTimeCodesII(){
		
	}

}