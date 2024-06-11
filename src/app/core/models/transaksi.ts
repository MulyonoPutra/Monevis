import { Bulan } from './bulan';
import { Unit } from './unit';

export interface Transaksi {
	id?: number;
  anggaran: number;
  real: number;
	keterangan: string;
	bulan: Bulan;
	daftarUnit: Unit;
}
