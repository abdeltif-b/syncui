import { faAdd, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FileUpload } from 'primereact/fileupload';
import { Divider } from 'primereact/divider';
import {
	S3Client,
	S3,
	PutObjectCommand,
	DeleteObjectCommand,
	GetObjectCommand,
	ListObjectsCommand
} from "@aws-sdk/client-s3";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { streamToString } from '../../utils/utils';
import { Upload } from "@aws-sdk/lib-storage";
import { Stream } from "stream";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() { }; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

const REGION = "us-east-1";
const BUCKET_NAME = "data-csv-import";

const s3Client = new S3Client({
	apiVersion: '2006-03-01',
	region: REGION,
	credentials: {
		accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
		secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
		// sessionToken: SessionToken
	}
});



// Put the object in the S3 bucket.
const uploadFile = async ({ key, body }) => {
	const bucketParams = {
		Bucket: BUCKET_NAME,
		Key: key,
		Body: body,

	};

	try {
		console.log(`Putting object "${bucketParams.Key}" in bucket`);
		const command = new PutObjectCommand({
			Bucket: bucketParams.Bucket,
			Key: bucketParams.Key,
			Body: bucketParams.Body,
		})
		const response = await s3Client.send(command);
	} catch (err) {
		console.log("Error putting object", err);
	}
}
const uploadFile2 = async ({ key, body }) => {
	const target = { Bucket: BUCKET_NAME, Key: key, Body: body };
	console.log(target)

	try {
		const parallelUploads3 = new Upload({
			client: new S3Client({}),
			// tags: [...], // optional tags
			// queueSize: 4, // optional concurrency configuration
			// partSize: 5MB, // optional size of each part
			// leavePartsOnError: false, // optional manually handle dropped parts
			params: { target },
		});

		parallelUploads3.on("httpUploadProgress", (progress) => {
			console.log(progress);
		});

		await parallelUploads3.done();
	} catch (e) {
		console.log(e);
	}
}

// Delete the object
const deleteFile = async () => {
	const bucketParams = {
		Bucket: BUCKET_NAME,
		Key: "OBJECT_NAME",
	};

	try {
		console.log(`\nDeleting object "${bucketParams.Key}"} from bucket`);
		const data = await s3Client.send(
			new DeleteObjectCommand({ Bucket: bucketParams.Bucket, Key: bucketParams.Key })
		);
		return data; // For unit tests.
	} catch (err) {
		console.log("Error deleting object", err);
	}
}


const sizeBodyTemplate = (rowData, options) => {
	const data = rowData[options.field] / (1024 * 1024)
	return data.toFixed(3) + ' MB'
};

const dateBodyTemplate = (rowData, options) => {
	const data = rowData[options.field].toLocaleString()
	return data
};



const emptyTemplate = () => {
	return (
		<div className="flex align-items-center flex-column">
			<FontAwesomeIcon icon={faFileCsv} className='text-8xl text-200' />
			<span className="mt-5">Faites glisser et déposez les fichiers CSV ici</span>
			<span className="text-500">(La taille maximale du fichier CSV ne doit pas dépasser 50MB)</span>
		</div>
	)
}
const chooseOptions = { label: 'Importer', icon: <FontAwesomeIcon icon={faAdd} className='mr-2' />, className: 'p-button-primary p-button-sm' };

const DataImportPage = ({ toast }) => {
	const [fileList, setFileList] = useState([])
	const [loading, setLoading] = useState(false)
	const [done, setDone] = useState(false)

	useEffect(async () => {
		// list the objects in an Amazon S3 bucket
		const command = new ListObjectsCommand({ Bucket: BUCKET_NAME })
		const response = await s3Client.send(command)
		setFileList((response.Contents))
	}, [])


	const onTemplateProgress = (e) => {
		console.log('onTemplateProgress................')

		setLoading(true);
	}
	const onTemplateUpload = (e) => {
		console.log('onTemplateUpload................')

		setDone(true);
	}
	const onBeforeSend = ({ xhr, formData }) => {
		console.log('onBeforeSend................')
		console.log('xhr', xhr)
		console.log('formData', formData)

	}

	const handleUpload2 = async ({ files, options }) => {
		const fileReader = new FileReader();
		fileReader.onload = (e) => {
			var s = new Stream.Readable()
			s.push(e.target.result)    // the string you want
			s.push(null)      // indicates end-of-file basically - the end of the stream


			uploadFile2({ key: files[0].name, body: s })
		}
		fileReader.readAsText(files[0]);

	}


	const handleUpload = ({ files, options }) => {
		// setUploadingState(true);
		const props = options.props
		const clear = options.clear
		var xhr = new XMLHttpRequest();
		var formData = new FormData();

		if (props.onBeforeUpload) {
			props.onBeforeUpload({
				'xhr': xhr,
				'formData': formData
			});
		}

		var _iterator = _createForOfIteratorHelper(files),
			_step;

		try {
			for (_iterator.s(); !(_step = _iterator.n()).done;) {
				var file = _step.value;
				formData.append(props.name, file, file.name);
			}
		} catch (err) {
			_iterator.e(err);
		} finally {
			_iterator.f();
		}

		xhr.upload.addEventListener('progress', function (event) {
			if (event.lengthComputable) {
				var progress = Math.round(event.loaded * 100 / event.total);
				// setProgressState(progress);

				if (props.onProgress) {
					props.onProgress({
						originalEvent: event,
						progress: progress
					});
				}
			}
		});

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				// setProgressState(0);
				// setUploadingState(false);

				if (xhr.status >= 200 && xhr.status < 300) {
					if (props.fileLimit) {
						uploadedFileCount + files.length, _readOnlyError("uploadedFileCount");
					}

					if (props.onUpload) {
						props.onUpload({
							xhr: xhr,
							files: files
						});
					}
				} else {
					if (props.onError) {
						props.onError({
							xhr: xhr,
							files: files
						});
					}
				}

				// clear();
			}
		};
		console.log('xhr', xhr)
		console.log('formData', formData)
		xhr.open('POST', 'hhhhhhhh', true);

		if (props.onBeforeSend) {
			props.onBeforeSend({
				'xhr': xhr,
				'formData': formData
			});
		}

		xhr.withCredentials = props.withCredentials;
		xhr.send(formData);

	}
	/////////////////////
	// const handleUpload = ({ files, options }) => {
	// 	const total = files.length
	// 	let loaded = 0;

	// 	console.log('options', options)
	// 	console.log('event', files)

	// 	options.onProgress = onTemplateProgress
	// 	options.onUpload = onTemplateUpload
	// 	files.map(item => {
	// 		console.log(item)
	// 		const fileReader = new FileReader();
	// 		fileReader.onload = (e) => {
	// 			uploadFile({ key: item.name, body: e.target.result })
	// 			loaded++;
	// 			if (loaded == total) {
	// 				console.log('all fiels uploaded');
	// 			}


	// 		};
	// 		fileReader.onprogress = function (data) {
	// 			console.log('data loadied', data)
	// 			if (data.lengthComputable) {
	// 				var progress = parseInt(((data.loaded / data.total) * 100), 10);
	// 				console.log(progress);
	// 			}
	// 		}
	// 		fileReader.onloadend = (e) => {
	// 			toast.current.show({ severity: 'info', summary: 'Success', detail: 'item Uploaded' });
	// 		};
	// 		fileReader.readAsText(item);
	// 	})

	// }





	return (
		<div className='flex flex-column'>
			{loading && <div>Chargement...</div>}
			{done && <div>Done...</div>}

			<FileUpload
				name="demo"
				// onBeforeSend={onBeforeSend}
				// onProgress={onTemplateProgress}
				// onUpload={onTemplateUpload}
				customUpload
				uploadHandler={handleUpload2}
				emptyTemplate={emptyTemplate}
				chooseOptions={chooseOptions}
				accept=".csv"
				maxFileSize={1024 * 1024 * 50}
				multiple

			// auto
			/>
			{/* <Divider /> */}
			<DataTable
				dataKey="key"
				value={fileList}
				// loading={!fileList}
				size="small"
				rows={10}
				paginator
			>
				<Column field="Key" header='Nom du fichier' />
				<Column field="LastModified" header='Dernière modification' body={dateBodyTemplate} />
				<Column field="Size" header='Taille' body={sizeBodyTemplate} />
			</DataTable>
		</div>

	);
}

export default DataImportPage;