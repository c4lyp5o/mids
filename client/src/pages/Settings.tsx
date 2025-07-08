import type React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

interface MosqueImage {
	filename: string;
	path: string;
	url: string;
	uploadedAt: string;
}

interface MosqueData {
	mosqueName: string;
	details?: string;
	zone: string;
	email: string;
	password: string;
	notifications?: Notification[];
	images?: MosqueImage[];
}

interface Notification {
	id: number;
	text: string;
}

const allZones = [
	{
		parent: "Kedah",
		children: [
			{ name: "KOTA SETAR, POKOK SENA DAN KUBANG PASU", value: "kdh01" },
			{ name: "KUALA MUDA, PENDANG DAN YAN", value: "kdh02" },
			{ name: "PADANG TERAP DAN SIK", value: "kdh03" },
			{ name: "BALING", value: "kdh04" },
			{ name: "KULIM DAN BANDAR BAHARU", value: "kdh05" },
			{ name: "LANGKAWI", value: "kdh06" },
			{ name: "GUNUNG JERAI", value: "kdh07" },
		],
	},
	{
		parent: "Kelantan",
		children: [
			{
				name: "JAJAHAN KOTA BHARU, BACHOK, PASIR PUTEH, TUMPAT , PASIR MAS, TANAH MERAH, MACHANG KUALA KRAI DAN GUA MUSANG (DAERAH CHIKU)",
				value: "ktn01",
			},
			{
				name: "JAJAHAN JELI, GUA MUSANG (DAERAH GALAS DAN BERTAM) DAN JAJAHAN KECIL LOJING",
				value: "ktn03",
			},
		],
	},
	{
		parent: "Johor",
		children: [
			{ name: "PULAU AUR DAN PULAU PEMANGGIL", value: "jhr01" },
			{ name: "KOTA TINGGI, MERSING DAN JOHOR BAHRU", value: "jhr02" },
			{ name: "KLUANG DAN PONTIAN", value: "jhr03" },
			{ name: "BATU PAHAT, MUAR, SEGAMAT DAN GEMAS JOHOR", value: "jhr04" },
		],
	},
	{
		parent: "Melaka",
		children: [{ name: "Seluruh Negeri Melaka", value: "mlk01" }],
	},
	{
		parent: "Negeri Sembilan",
		children: [
			{ name: "JEMPOL DAN TAMPIN", value: "ngs01" },
			{
				name: "PORT DICKSON, SEREMBAN, KUALA PILAH, JELEBU DAN REMBAU",
				value: "ngs02",
			},
		],
	},
	{
		parent: "Pahang",
		children: [
			{ name: "PULAU TIOMAN", value: "phg01" },
			{ name: "ROMPIN, PEKAN, MUADZAM SHAH DAN KUANTAN", value: "phg02" },
			{
				name: "MARAN, CHENOR, TEMERLOH, BERA, JENGKA DAN JERANTUT",
				value: "phg03",
			},
			{ name: "BENTONG, RAUB DAN LIPIS", value: "phg04" },
			{
				name: "BUKIT TINGGI, GENTING SEMPAH, DAN JANDA BAIK",
				value: "phg05",
			},
			{
				name: "CAMERON HIGHLANDS, BUKIT FRASER DAN GENTING HIGHLANDS",
				value: "phg06",
			},
		],
	},
	{
		parent: "Perak",
		children: [
			{ name: "TAPAH, SLIM RIVER DAN TANJUNG MALIM", value: "prk01" },
			{
				name: "IPOH, BATU GAJAH, KAMPAR, SG. SIPUT DAN KUALA KANGSAR",
				value: "prk02",
			},
			{ name: "PENGKALAN HULU, GERIK DAN LENGGONG", value: "prk03" },
			{ name: "TEMENGOR DAN BELUM", value: "prk04" },
			{
				name: "TELUK INTAN, BAGAN DATUK, KG. GAJAH, SERI ISKANDAR, BERUAS, PARIT, LUMUT, SITIAWAN DAN PULAU PANGKOR",
				value: "prk05",
			},
			{
				name: "SELAMA, TAIPING, BAGAN SERAI DAN PARIT BUNTAR",
				value: "prk06",
			},
			{ name: "BUKIT LARUT", value: "prk07" },
		],
	},
	{
		parent: "Perlis",
		children: [{ name: "Seluruh negeri Perlis", value: "pls01" }],
	},
	{
		parent: "Pulau Pinang",
		children: [{ name: "Seluruh negeri Pulau Pinang", value: "png01" }],
	},
	{
		parent: "Sabah",
		children: [
			{
				name: "BAHAGIAN SANDAKAN (TIMUR) BANDAR SANDAKAN, BUKIT GARAM, SEMAWANG, TEMANGGONG DAN TAMBISAN",
				value: "sbh01",
			},
			{
				name: "BAHAGIAN SANDAKAN (BARAT) PINANGAH, TERUSAN, BELURAN, KUAMUT DAN TELUPID",
				value: "sbh02",
			},
			{
				name: "BAHAGIAN TAWAU (TIMUR) LAHAD DATU, KUNAK, SILABUKAN, TUNGKU, SAHABAT, DAN SEMPORNA",
				value: "sbh03",
			},
			{
				name: "BAHAGIAN TAWAU (BARAT), BANDAR TAWAU, BALONG, MEROTAI DAN KALABAKAN",
				value: "sbh04",
			},
			{
				name: "BAHAGIAN KUDAT KUDAT, KOTA MARUDU, PITAS DAN PULAU BANGGI",
				value: "sbh05",
			},
			{ name: "GUNUNG KINABALU", value: "sbh06" },
			{
				name: "BAHAGIAN PANTAI BARAT KOTA KINABALU, PENAMPANG, TUARAN, PAPAR, KOTA BELUD, PUTATAN DAN RANAU",
				value: "sbh07",
			},
			{
				name: "BAHAGIAN PEDALAMAN (ATAS) PENSIANGAN, KENINGAU, TAMBUNAN DAN NABAWAN",
				value: "sbh08",
			},
			{
				name: "BAHAGIAN PEDALAMAN (BAWAH) SIPITANG, MEMBAKUT, BEAUFORT, KUALA PENYU, WESTON, TENOM DAN LONG PA SIA",
				value: "sbh09",
			},
		],
	},
	{
		parent: "Sarawak",
		children: [
			{ name: "LIMBANG, SUNDAR, TRUSAN DAN LAWAS", value: "swk01" },
			{ name: "NIAH, SIBUTI, MIRI, BEKENU DAN MARUDI", value: "swk02" },
			{
				name: "TATAU, SUAI, BELAGA, PANDAN, SEBAUH, BINTULU",
				value: "swk03",
			},
			{
				name: "IGAN, KANOWIT, SIBU, DALAT, OYA, BALINGIAN, MUKAH, KAPIT DAN SONG",
				value: "swk04",
			},
			{
				name: "BELAWAI, MATU, DARO, SARIKEI, JULAU, BINTANGOR DAN RAJANG",
				value: "swk05",
			},
			{
				name: "KABONG, LINGGA, SRI AMAN, ENGKELILI, BETONG, SPAOH, PUSA, SARATOK, ROBAN, DEBAK DAN LUBOK ANTU",
				value: "swk06",
			},
			{
				name: "SAMARAHAN, SIMUNJAN, SERIAN, SEBUYAU DAN MELUDAM",
				value: "swk07",
			},
			{ name: "KUCHING, BAU, LUNDU DAN SEMATAN", value: "swk08" },
			{ name: "KAMPUNG PATARIKAN", value: "swk09" },
		],
	},
	{
		parent: "Selangor",
		children: [
			{
				name: "HULU SELANGOR, GOMBAK, PETALING/SHAH ALAM, HULU LANGAT DAN SEPANG",
				value: "sgr01",
			},
			{ name: "SABAK BERNAM DAN KUALA SELANGOR", value: "sgr02" },
			{ name: "KLANG DAN KUALA LANGAT", value: "sgr03" },
		],
	},
	{
		parent: "Terengganu",
		children: [
			{ name: "KUALA TERENGGANU, MARANG DAN KUALA NERUS", value: "trg01" },
			{ name: "BESUT DAN SETIU", value: "trg02" },
			{ name: "HULU TERENGGANU", value: "trg03" },
			{ name: "DUNGUN DAN KEMAMAN", value: "trg04" },
		],
	},
	{
		parent: "Wilayah Persekutuan",
		children: [
			{ name: "Kuala Lumpur dan Putrajaya", value: "wly01" },
			{ name: "Labuan", value: "wly02" },
		],
	},
];

const Settings: React.FC = () => {
	const { mosqueId } = useParams<{ mosqueId: string }>();
	const navigate = useNavigate();
	const [mosqueData, setMosqueData] = useState<MosqueData | null>(null);
	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
	const [uploading, setUploading] = useState(false);

	const handleNotificationChange = (id: number, value: string) => {
		setMosqueData((prev) => {
			if (!prev) return prev;
			const updatedNotifications = prev.notifications?.map((n) =>
				n.id === id ? { ...n, text: value } : n,
			);
			return {
				...prev,
				notifications: updatedNotifications || [{ id, text: value }],
			};
		});
	};

	const handleAddNotification = () => {
		setMosqueData((prev) => {
			if (!prev) return prev;
			const newNotification = {
				id: prev.notifications ? prev.notifications.length + 1 : 1,
				text: "",
			};
			return {
				...prev,
				notifications: [...(prev.notifications || []), newNotification],
			};
		});
	};

	const handleDeleteNotification = (id: number) => {
		setMosqueData((prev) => {
			if (!prev) return prev;
			const updatedNotifications = prev.notifications?.filter(
				(n) => n.id !== id,
			);
			return {
				...prev,
				notifications: updatedNotifications || [],
			};
		});
	};

	const handleImageUpload = async () => {
		if (!selectedFiles || !mosqueId) return;

		setUploading(true);
		const formData = new FormData();

		for (const file of Array.from(selectedFiles)) {
			formData.append("images", file);
		}

		const token = localStorage.getItem("mosqueToken");

		try {
			await axios.post(`/api/v1/mosque/${mosqueId}/images`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			});

			await fetchMosqueData();
			setSelectedFiles(null);

			// Reset file input
			const fileInput = document.getElementById(
				"imageInput",
			) as HTMLInputElement;
			if (fileInput) fileInput.value = "";
		} catch (error) {
			console.error("Error uploading images:", error);
			alert("Failed to upload images");
		} finally {
			setUploading(false);
		}
	};

	const handleDeleteImage = async (filename: string) => {
		if (!mosqueId) return;

		const token = localStorage.getItem("mosqueToken");

		try {
			await axios.delete(`/api/v1/mosque/${mosqueId}/images/${filename}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			await fetchMosqueData();
		} catch (error) {
			console.error("Error deleting image:", error);
			alert("Failed to delete image");
		}
	};

	const fetchMosqueData = async () => {
		const token = localStorage.getItem("mosqueToken");
		// console.log('Fetching mosque data...');
		const response = await axios.get<MosqueData>(`/api/v1/mosque/${mosqueId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		// console.log('Fetched mosque data:', response.data);
		setMosqueData(response.data);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const filledNotifications = mosqueData?.notifications?.filter(
			(n) => n.text.trim() !== "",
		);

		const token = localStorage.getItem("mosqueToken");

		console.log({
			...mosqueData,
		});

		await axios.put(
			`/api/v1/mosque/${mosqueId}`,
			{
				mosqueName: mosqueData?.mosqueName,
				details: mosqueData?.details,
				zone: mosqueData?.zone,
				email: mosqueData?.email,
				password: mosqueData?.password,
				notifications: filledNotifications,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: later
	useEffect(() => {
		fetchMosqueData().catch((error) => {
			console.error("Error fetching mosque data on mount:", error);
			navigate("/", {
				state: { from: window.location.pathname },
			});
		});
	}, [navigate]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
			{" "}
			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8 relative">
					{/* Back Button */}
					<button
						type="button"
						onClick={() => navigate(`/interstitial/${mosqueId}`)}
						className="absolute left-0 top-0 flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
					>
						<svg
							className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Back</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						<span className="font-medium">Back</span>
					</button>

					<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
						Mosque Settings
					</h1>
					<p className="text-gray-600">
						Configure your mosque information and notifications
					</p>
				</div>

				{/* Settings Card */}
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Basic Information Section */}
						<div className="space-y-6">
							<h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
								Basic Information
							</h2>

							{/* Mosque Name */}
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700">
									Mosque Name
									<input
										type="text"
										value={mosqueData?.mosqueName || ""}
										onChange={(e) =>
											setMosqueData((prev) =>
												prev
													? { ...prev, mosqueName: e.target.value }
													: {
															mosqueName: e.target.value,
															details: "",
															zone: "",
															email: "",
															password: "",
														},
											)
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
										placeholder="Enter mosque name"
									/>
								</label>
							</div>

							{/* Details */}
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700">
									Details
									<input
										type="text"
										value={mosqueData?.details || ""}
										onChange={(e) =>
											setMosqueData((prev) =>
												prev
													? { ...prev, details: e.target.value }
													: {
															mosqueName: "",
															details: e.target.value,
															zone: "",
															email: "",
															password: "",
														},
											)
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
										placeholder="Enter details"
									/>
								</label>
							</div>

							{/* Zone */}
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700">
									Zone
									<select
										onChange={(e) =>
											setMosqueData((prev) =>
												prev
													? { ...prev, zone: e.target.value }
													: {
															mosqueName: "",
															details: "",
															zone: e.target.value,
															email: "",
															password: "",
														},
											)
										}
										value={mosqueData?.zone || ""}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
										required
									>
										<option value="">Sila pilih zon...</option>
										{allZones.map((zone) => (
											<optgroup key={zone.parent} label={zone.parent}>
												{zone.children.map((child) => (
													<option key={child.value} value={child.value}>
														{child.name}
													</option>
												))}
											</optgroup>
										))}
									</select>
								</label>
							</div>

							{/* Email */}
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700">
									Email
									<input
										type="email"
										value={mosqueData?.email || ""}
										onChange={(e) =>
											setMosqueData((prev) =>
												prev
													? { ...prev, email: e.target.value }
													: {
															mosqueName: "",
															details: "",
															zone: "",
															email: e.target.value,
															password: "",
														},
											)
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
										placeholder="Enter email address"
									/>
								</label>
							</div>

							{/* Password */}
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700">
									Password
									<input
										type="password"
										value={mosqueData?.password || ""}
										onChange={(e) =>
											setMosqueData((prev) =>
												prev
													? { ...prev, password: e.target.value }
													: {
															mosqueName: "",
															details: "",
															zone: "",
															email: "",
															password: e.target.value,
														},
											)
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
										placeholder="Enter password"
									/>
								</label>
							</div>
						</div>

						{/* Notifications Section */}
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
								Notifications
							</h2>

							<div className="space-y-3">
								{mosqueData?.notifications?.map((n, idx) => (
									<div key={n.id} className="flex gap-3">
										<input
											type="text"
											value={n.text}
											onChange={(e) =>
												handleNotificationChange(n.id, e.target.value)
											}
											className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
											placeholder={`Notification ${idx + 1}`}
										/>
										<button
											type="button"
											onClick={() => handleDeleteNotification(n.id)}
											className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
											title="Delete notification"
										>
											✕
										</button>
									</div>
								))}
							</div>

							<button
								type="button"
								onClick={handleAddNotification}
								className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 font-medium"
							>
								+ Add Notification
							</button>
						</div>

						{/* Images Section */}
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
								Images
							</h2>
							<div className="space-y-3">
								{mosqueData?.images?.map((image) => (
									<div
										key={image.filename}
										className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
									>
										<div className="flex items-center gap-3">
											<img
												src={image.url}
												alt={image.filename}
												className="w-16 h-16 object-cover rounded-lg"
											/>
											<div className="flex flex-col">
												<span className="text-sm font-medium text-gray-800">
													{image.filename}
												</span>
												<span className="text-xs text-gray-500">
													Uploaded at:{" "}
													{new Date(image.uploadedAt).toLocaleString()}
												</span>
											</div>
										</div>
										<button
											type="button"
											onClick={() => handleDeleteImage(image.filename)}
											className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
											title="Delete image"
										>
											✕
										</button>
									</div>
								))}
							</div>{" "}
							<div className="space-y-3">
								<input
									id="imageInput"
									type="file"
									accept="image/*"
									multiple
									onChange={(e) => setSelectedFiles(e.target.files)}
									className="hidden"
								/>
								<label
									htmlFor="imageInput"
									className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center justify-center cursor-pointer"
								>
									📁 Choose Images
								</label>
								{selectedFiles && (
									<div className="space-y-2">
										<div className="text-sm text-gray-500">
											Selected files:{" "}
											{Array.from(selectedFiles)
												.map((file) => file.name)
												.join(", ")}
										</div>
										<button
											type="button"
											onClick={handleImageUpload}
											disabled={uploading}
											className="w-full py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 font-medium"
										>
											{uploading ? "Uploading..." : "📤 Upload Images"}
										</button>
									</div>
								)}
							</div>
						</div>

						{/* Submit Button */}
						<div className="pt-6 border-t border-gray-200">
							<button
								type="submit"
								className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
							>
								Save Settings
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Settings;
