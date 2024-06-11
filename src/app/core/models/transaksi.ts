import { Bulan } from './bulan';
import { Unit } from './unit';

export interface Transaksi {
	id?: number;
	anggaran: string;
	real: string;
	keterangan: string;
	bulan: Bulan;
	daftarUnit: Unit;
}
