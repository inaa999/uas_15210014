
import { Injectable } from '@angular/core';
import axios, { AxiosResponse, AxiosError } from 'axios'; // Import AxiosResponse dan AxiosError
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  static getuser(arg0: string) {
    throw new Error('Method not implemented.');
  }
  [x: string]: any;
  public uriApi: string = 'https://greenland-foresthill.id/rest-api/index.php/';

  constructor(
    public storage: Storage
  ) { }

  async login(username: string, password: string) {
    console.log(username && password);
    try {
      let url =
        this.uriApi + 'login?username=' + username + '&password=' + password;
      const res = await axios.get(url);
      if (res.data.status == 'Ok') {
        let data = res.data.result[0];
        const storage = await this.storage.create();
        storage.set('isLoggedIn', data.kd_penduduk);
        localStorage.setItem('isLoggedIn', data.kd_penduduk);
        return 'success';
      } else {
        return 'notFound';
      }
    } catch (err: any) {
      console.log(err);
      if (
        err.response &&
        err.response.data &&
        err.response.data.message == 'User not found!'
      ) {
        return 'notFound';
      } else {
        return 'err';
      }
    }
  }
  // Penduduk
  async getPenduduk(nik: string) {
    try {
      var url = '';
      if (
        nik == undefined || nik == ''
      ) {
        url = this.uriApi + 'penduduk';
        const res: AxiosResponse = await axios.get(url);
        console.log(res)
        let data = res.data.result;
        return {
          msg: 'ok',
          data: data,
        };
      } else {
        url = this.uriApi + 'penduduk?kd_pnddk=' + nik;
        const res: AxiosResponse = await axios.get(url);
        let data = res.data.result;
        return {
          msg: 'ok',
          data: data[0],
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async createPenduduk(data: any) {
    try {
      let url = this.uriApi + 'penduduk';

      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async update_Penduduk(data: any) {
    try {
      let url = this.uriApi + 'update_penduduk'; // Ensure this matches your server-side endpoint
      const res: AxiosResponse = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async delete_Penduduk(kd_penduduk: string) {
    try {
      let url = this.uriApi + 'delete_penduduk';
      const res: AxiosResponse = await axios.post(url, {
        kd_penduduk: kd_penduduk,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }


  // Info
  async getInfo() {
    try {
        let url = this.uriApi + 'info';

        // Tambahkan kd ke URL jika diberikan

        const res: AxiosResponse = await axios.get(url);
        let data = res.data.result;
        console.log(data);

        return {
            msg: 'ok',
            data: data,
        };
    } catch (err: any) {
        console.log(err);

        if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.status == 'Err') {
            return {
                msg: 'notFound',
            };
        } else {
            return {
                msg: 'err',
                err: err,
            };
        }
    }
}

  
  async createInfo(data: any) {
    try {
      let url = this.uriApi + 'info';

      const res = await axios.post(url, data);

      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updateInfo(data: any, kd: string) {
    try {
      let url = this.uriApi + 'update_info';
      const res: AxiosResponse = await axios.post(url, {
        kd: kd,
        judul_info: data.judul_info,
        informasi: data.informasi,
        tgl_info: data.tgl_info,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  
  async delete_Info(kd_info: string) {
    try {
      let url = this.uriApi + 'delete_info';
      const res: AxiosResponse = await axios.post(url, {
        kd_info: kd_info,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }


  // Blok
  async getBlok() {
    try {
      let url = this.uriApi + 'blok';
      // if (kd) {
      //     url += `?kd=${kd}`;
      // }

      const res: AxiosResponse = await axios.get(url);

      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async createBlok(data: any) {
    try {
      let url = this.uriApi + 'blok';

      const res = await axios.post(url, data);

      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updateBlok(data: any, kd_blok: string) {
    try {
      let url = this.uriApi + 'update_blok';
      const res: AxiosResponse = await axios.post(url, {
        kd_blok: kd_blok,
        nama_blok: data.nama_blok,
        no_blok: data.no_blok,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async delete_Blok(kd_blok: string) {
    try {
      let url = this.uriApi + 'delete_blok';
      const res: AxiosResponse = await axios.post(url, {
        kd_blok: kd_blok,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
//iuran
  async getIuran() {
    try {
      let url = this.uriApi + 'iuran';

      // // Build query parameters based on provided values
      // const queryParams: string[] = [];
      // if (kd) queryParams.push(kd=${kd});
      // if (tahun) queryParams.push(thn=${tahun});
      // if (bulan) queryParams.push(bln=${bulan});
      // if (jenis) queryParams.push(jenis=${jenis});

      // // Append query parameters to the URL
      // if (queryParams.length > 0) {
      //     url += '?' + queryParams.join('&');
      // }

      const res: AxiosResponse = await axios.get(url);

      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async createIuran(data: any) {
    try {
      let url = this.uriApi + 'Iuran';

      const res = await axios.post(url, data);

      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updateIuran(data: any, kd_iuran: string) {
    try {
      let url = this.uriApi + 'Update_iuran';
      const res: AxiosResponse = await axios.post(url, {
        kd_iuran: kd_iuran,
        status: data.status,
        kd_blok: data.kd_blok,
        kd_penduduk: data.kd_penduduk,
        jenis_pembayaran: data.jenis_pembayaran,
        tgl_pembayaran: data.tgl_pembayaran,
        kas_bulan: data.kas_bulan,
        kas_tahun: data.kas_tahun,
        iuran_foto: data.iuran_foto,
        keterangan: data.keterangan
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async delete_Iuran(kd_iuran: string) {
    try {
      let url = this.uriApi + 'delete_iuran';
      const res: AxiosResponse = await axios.post(url, {
        kd_iuran: kd_iuran,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  // Pesan
  async getPesan(nik?: string) {
    try {
      let url = this.uriApi + 'pesan';
      
      // Jika nik diberikan, tambahkan ke URL sebagai parameter query string
      if (nik) {
        url += `?nik=${nik}`;
      }
  
      const res: AxiosResponse = await axios.get(url);
  
      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  
  

  async createPesan(data: any) {
    try {
      let url = this.uriApi + 'Pesan';

      const res = await axios.post(url, data);

      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updatePesan(data: any, kd_pesan: string) {
    try {
      let url = this.uriApi + 'Update_pesan';
      const res: AxiosResponse = await axios.post(url, {
        kd_pesan: kd_pesan,
        kd_penduduk: data.kd_penduduk,
        pesan: data.pesan,
        tgl_pesan: data.tgl_pesan
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async delete_Pesan(kd_pesan: string) {
    try {
      let url = this.uriApi + 'delete_pesan';
      const res: AxiosResponse = await axios.post(url, {
        kd_pesan: kd_pesan,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
// Pengeluaran
async getPengeluaran(kd_pengeluaran?: string) {
  try {
    let url = this.uriApi + 'pengeluaran';

    // Jika kd_pengeluaran diberikan, tambahkan ke URL sebagai parameter query string
    if (kd_pengeluaran) {
      url += `?kd_pengeluaran=${kd_pengeluaran}`;
    }

    const res: AxiosResponse = await axios.get(url);

    let data = res.data.result;
    return {
      msg: 'ok',
      data: data,
    };
  } catch (err: any) {
    return {
      msg: 'err',
      err: err,
    };
  }
}

async createPengeluaran(kd_pengeluaran: any) {
  try {
    let url = this.uriApi + 'pengeluaran';

    const res = await axios.post(url, kd_pengeluaran);

    if (res.data.status == 'Ok') {
      return {
        msg: 'ok',
      };
    } else {
      return {
        msg: 'notOk',
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      msg: 'err',
      err: err,
    };
  }
}

async updatePengeluaran(data: any, kd_pengeluaran: string) {
  try {
    let url = this.uriApi + 'Update_pengeluaran';
    const res: AxiosResponse = await axios.post(url, {
      kd_pengeluaran: kd_pengeluaran,
      nama_pengeluaran: data.nama_pengeluaran,
      
    });

    if (res.data.status === 'Ok') {
      return {
        msg: 'ok',
      };
    } else {
      return {
        msg: 'notOk',
      };
    }
  } catch (err: any) {
    return {
      msg: 'err',
      err: err,
    };
  }
}

async deletePengeluaran(kd_pengeluaran: string) {
  try {
    let url = this.uriApi + 'delete_pengeluaran';
    const res: AxiosResponse = await axios.post(url, {
      kd_pengeluaran: kd_pengeluaran,
    });

    if (res.data.status === 'Ok') {
      return {
        msg: 'ok',
      };
    } else {
      return {
        msg: 'notOk',
      };
    }
  } catch (err: any) {
    return {
      msg: 'err',
      err: err,
    };
  }
}
// uang
async getuang(kd_uangkeluar?: string) {
  try {
    let url = this.uriApi +'uang_keluar';

    // Jika kd_pengeluaran diberikan, tambahkan ke URL sebagai parameter query string
    if (kd_uangkeluar) {
      url += `?kd_uangkeluar=${kd_uangkeluar}`;
    }

    const res: AxiosResponse = await axios.get(url);

    let data = res.data.result;
    return {
      msg: 'ok',
      data: data,
    };
  } catch (err: any) {
    return {
      msg: 'err',
      err: err,
    };
  }
}

async createuangkeluar(kd_uangkeluar: any) {
  try {
    let url = this.uriApi + 'uang_keluar';

    const res = await axios.post(url, kd_uangkeluar);

    if (res.data.status == 'Ok') {
      return {
        msg: 'ok',
      };
    } else {
      return {
        msg: 'notOk',
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      msg: 'err',
      err: err,
    };
  }
}

async updateUang(kd_uangkeluar: any) {
  try {
    let url = this.uriApi + 'Update_uang'; // Ensure this matches your server-side endpoint
    const res: AxiosResponse = await axios.post(url, kd_uangkeluar);
    if (res.data.status == 'Ok') {
      return {
        msg: 'ok',
      };
    } else {
      return {
        msg: 'notOk',
      };
    }
  } catch (err: any) {
    return {
      msg: 'err',
      err: err,
    };
  }
}
async deleteuang(kd_keluar: string) {
  try {
    let url = this.uriApi + 'delete_uang';
    const res: AxiosResponse = await axios.post(url, {
      kd_keluar: kd_keluar,
    });

    if (res.data.status === 'Ok') {
      return {
        msg: 'ok',
      };
    } else {
      return {
        msg: 'notOk',
      };
    }
  } catch (err: any) {
    return {
      msg: 'err',
      err: err,
    };
  }
}
  // Surat
    // Info
    async getSurat() {
      try {
          let url = this.uriApi + 'Surat_keluar';
  
          // Tambahkan kd ke URL jika diberikan
  
          const res: AxiosResponse = await axios.get(url);
          let data = res.data.result;
          console.log(data);
  
          return {
              msg: 'ok',
              data: data,
          };
      } catch (err: any) {
          console.log(err);
  
          if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.status == 'Err') {
              return {
                  msg: 'notFound',
              };
          } else {
              return {
                  msg: 'err',
                  err: err,
              };
          }
      }
  }
  async createSurat(data: any) {
    try {
      let url = this.uriApi + 'Surat_keluar';

      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async Update_surat(data: any, kd_surat_keluar: string) {
    try {
      let url = this.uriApi + 'Update_surat'; // Ensure this matches your server-side endpoint
      const res: AxiosResponse = await axios.post(url,
       data
      );
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async Delete_surat(kd_surat_keluar: string) {
    try {
      let url = this.uriApi + 'Delete_surat';
      const res: AxiosResponse = await axios.post(url, {
        kd_surat_keluar: kd_surat_keluar,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  // User
  async getUser(kd_penduduk:string) {
    var url = '';
    try {
      if(kd_penduduk== ''){
        url = this.uriApi + 'User';
        }else{
          url = this.uriApi + 'User?kd_penduduk=' + kd_penduduk;
        }

      const res: AxiosResponse = await axios.get(url);

      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async createUser(data: any) {
    try {
      let url = this.uriApi + 'User';

      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updateUser(data: any) {
    try {
      let url = this.uriApi + 'update_user'; // Ensure this matches your server-side endpoint
      const res: AxiosResponse = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async delete_User(kd_user: string) {
    try {
      let url = this.uriApi + 'Delete_user';
      const res: AxiosResponse = await axios.post(url, {
        kd_user: kd_user,
      });

      if (res.data.status === 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
}