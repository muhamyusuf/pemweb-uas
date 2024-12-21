import os

# Tentukan direktori root berdasarkan struktur folder baru
root_directory = "./"  # Ganti dengan path direktori Anda jika perlu
output_file = "output.txt"  # Nama file output

# Fungsi untuk memproses semua file dalam direktori dan subdirektori
def process_directory(directory, outfile):
    for root, _, files in os.walk(directory):
        for filename in files:
            file_path = os.path.join(root, filename)
            
            # Hanya proses file yang benar-benar file (bukan direktori)
            if os.path.isfile(file_path):
                try:
                    # Tulis nama file dengan path relatif
                    relative_path = os.path.relpath(file_path, start=root_directory)
                    outfile.write(f"### File: {relative_path} ###\n")
                    
                    # Tulis isi file
                    with open(file_path, "r", encoding="utf-8") as infile:
                        outfile.write(infile.read())
                    
                    # Tambahkan pemisah antar file
                    outfile.write("\n\n" + ("=" * 80) + "\n\n")
                except Exception as e:
                    print(f"Gagal membaca file {file_path}: {e}")

# Buka file output untuk menulis
with open(output_file, "w", encoding="utf-8") as outfile:
    # Proses direktori root dan subdirektorinya
    process_directory(root_directory, outfile)

print(f"Semua file telah digabungkan ke dalam {output_file}")
